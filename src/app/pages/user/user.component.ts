import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/users/users.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NotificationsService } from '../../@core/utils/notifications.service';
import { NbLoginComponent } from '@nebular/auth';
import { LogLevel } from '@aspnet/signalr';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {

  settings = {
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

  constructor(private service: UserService,
    private notifications: NotificationsService,
     ) {
      this.config = notifications.config;

    this.source.onRemoved().subscribe(remove => {
      this.service.delete(remove.id).subscribe(removed => {
        notifications.info('item has been removed.');
      }, err => notifications.error(err.error.message));
    });

    this.source.onUpdated().subscribe(update => {
      this.service.update(update.id, update).subscribe(updated => {
         notifications.info(`item has been updated.`);
      }, err => notifications.error(err.error.message));
    });

    this.source.onAdded().subscribe(create => {
      create.password = 'passwordsareverysecure';
      this.service.insert(create).subscribe(created => {
         notifications.info(`item created.`);

      }, err => {
        notifications.error(err.error.message);
      });
    });

    const data = this.service.getAll().subscribe(users => {
      this.source.load(users);
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