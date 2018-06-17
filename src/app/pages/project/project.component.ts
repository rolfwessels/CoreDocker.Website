import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/users.service';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  settings = {
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
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UserService,
     ) {
    this.source.onRemoved().subscribe(remove => {
      this.service.delete(remove.id).subscribe(removed => {
        console.log(`removed ${removed}`);
      });
    });
    this.source.onUpdated().subscribe(update => {
      this.service.update(update.id, update).subscribe(updated => {
        console.log(`updated ${updated}`);
      });
    });
    this.source.onAdded().subscribe(create => {
      create.password = 'sending1';
      this.service.insert(create).subscribe(created => {
        console.log(`created ${created}`);
      });
    });
    const data = this.service.getAll().subscribe(data1 => {
      this.source.load(data1);
    });
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
