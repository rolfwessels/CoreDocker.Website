import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://github.com/akveo/ngx-admin" target="_blank">Akveo</a></b> 2017</span>
  `,
})
export class FooterComponent {
}
