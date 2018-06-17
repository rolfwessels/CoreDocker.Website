import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectCreateUpdateModel, ProjectReferenceModel } from './project.model';
import { ApiService } from '../api.service';


enum ProjectApiUrls {
  getAll = '/api/project',
  insert = '/api/project',
  getAllDetail = '/api/project/detail',
  getById = '/api/project/{id}',
  update = '/api/project/{id}',
  delete = '/api/project/{id}',
}

@Injectable()
export class ProjectService {
  private _prefix: string;

  constructor(private apiService: ApiService) {
    this._prefix = '/api/project';
  }

  getAll(): Observable<ProjectReferenceModel[]> {
    const result = this.apiService.get(ProjectApiUrls.getAll);
    return result;
  }

  getAllDetail(): Observable<Project[]> {
    const result = this.apiService.get(ProjectApiUrls.getAllDetail);
    return result;
  }

  getById(id: string): Observable<Project> {
    const result = this.apiService.get(ProjectApiUrls.getById.replace('{id}', id));
    return result;
  }

  insert( project: ProjectCreateUpdateModel): Observable<Project> {
    const result = this.apiService.post(ProjectApiUrls.insert, project);
    return result;
  }

  update(id: string, project: ProjectCreateUpdateModel): Observable<Project> {
    return this.apiService.put(ProjectApiUrls.update.replace('{id}', id), project);
  }

  delete(id): Observable<Project> {
    return this.apiService.delete(ProjectApiUrls.delete.replace('{id}', id));
  }
}


/* scaffolding
[
    {
      "FileName": "data.module.ts",
      "Indexline": "ProjectService,",
      "InsertAbove": true,
      "InsertInline": false,
      "Lines": [
        "ProjectService,"
      ]
    },
    {
      "FileName": "data.module.ts",
      "Indexline": "/projects.service",
      "InsertAbove": false,
      "InsertInline": false,
      "Lines": [
        "import { ProjectService } from './projects/projects.service';"
      ]
    }
] scaffolding */
