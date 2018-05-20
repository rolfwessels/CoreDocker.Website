import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'ngx-last-updated',
  templateUrl: './last-updated.component.html',
  styleUrls: ['./last-updated.component.scss'],
})
export class LastUpdatedComponent implements OnInit {

  @Input() references: any[];
  constructor() {
    this.references = ['casd', 'cas1d'];
  }

  ngOnInit() {

  }

}

