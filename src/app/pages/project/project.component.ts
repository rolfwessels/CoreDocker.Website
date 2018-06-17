import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NotificationsService } from '../../@core/utils/notifications.service';
import { NbLoginComponent } from '@nebular/auth';
import { LogLevel } from '@aspnet/signalr';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { ProjectService } from '../../@core/data/projects/projects.service';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})

export class ProjectComponent implements OnInit {

  settings = {
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
    },
    actions: {
      position: 'right', // left|right
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };
  config: ToasterConfig;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ProjectService,
    private notifications: NotificationsService,
     ) {
      this.config = notifications.config;

    this.source.onRemoved().subscribe(remove => {
      this.service.delete(remove.id).subscribe(removed => {
        notifications.info(`${remove.name} has been removed.`);
      }, err => notifications.error(err.error.message));
    });

    this.source.onUpdated().subscribe(update => {
      this.service.update(update.id, update).subscribe(updated => {
         notifications.info(`${update.name} has been updated.`);
      }, err => notifications.error(err.error.message));
    });

    this.source.onAdded().subscribe(create => {
      this.service.insert(create).subscribe(created => {
         notifications.info(`${create.name} created.`);
         Object.assign(create, created);
      }, err => {
        notifications.error(err.error.message);
      });
    });

    const data = this.service.getAll().subscribe(projects => {
      this.source.load(projects);
    }, err => notifications.error(err.error.message) );


  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  }

}

/* scaffolding [
    {
      "FileName": "pages-menu.ts",
      "Indexline": "\/*scaffolding*\/",
      "InsertAbove": true,
      "InsertInline": false,
      "Lines": [
        "{",
        "  title: 'Projects',",
        "  icon: 'nb-notifications',",
        "  link: '/pages/projects',",
        "},",
      ]
    },
    {
      "FileName": "pages-routing.module.ts",
      "Indexline": "\/*scaffolding*\/",
      "InsertAbove": true,
      "InsertInline": false,
      "Lines": [
        "{",
        "  path: 'projects',",
        "  component: ProjectComponent,",
        "},",
      ]
    },
    {
      "FileName": "pages-routing.module.ts",
      "Indexline": "import { ProjectComponent }",
      "InsertAbove": false,
      "InsertInline": false,
      "Lines": [
        "import { ProjectComponent } from './project/project.component';"
      ]
    },
    {
      "FileName": "pages.module.ts",
      "Indexline": "ProjectComponent,",
      "InsertAbove": true,
      "InsertInline": false,
      "Lines": [
        "ProjectComponent,"
      ]
    },
    {
      "FileName": "pages.module.ts",
      "Indexline": "/project.component",
      "InsertAbove": false,
      "InsertInline": false,
      "Lines": [
        "import { ProjectComponent } from './project/project.component';"
      ]
    }
] scaffolding */
