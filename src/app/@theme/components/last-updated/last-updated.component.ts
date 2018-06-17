import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/observable/of';


@Component({
  selector: 'ngx-last-updated',
  templateUrl: './last-updated.component.html',
  styleUrls: ['./last-updated.component.scss'],
})
export class LastUpdatedComponent implements OnInit {

  @Input() references: LastUpdateModel[];
  @Input() title: string;
  @Input() count: string;

  constructor() {
    this.references = [];
  }

  ngOnInit() {

  }

}


export class LastUpdateModel {
  constructor ( id: string,
    name: string,
    updateDate: Date,
    decription: string = '') {
    this.id = id;
    this.name = name;
    this.decription = decription;
    this.updateDate = updateDate;
  }
  public id: string;
  public name: string;
  public decription: string;
  public updateDate: Date;
}
