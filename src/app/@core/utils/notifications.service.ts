import { Injectable } from '@angular/core';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

@Injectable()
export class NotificationsService {

  config: ToasterConfig;
  constructor(private toasterService: ToasterService) {

    this.config = new ToasterConfig({
      positionClass: 'toast-bottom-full-width',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation:  'slideUp',
      limit: 3,
    });
  }

  private showToast(type: string, title: string, body: string) {

    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      showCloseButton: true,
    };
    this.toasterService.popAsync(toast);
  }

  info(body: string, title: string = 'Information') {
    this.showToast('info', title, body);
  }

  success(body: string, title: string = 'Success') {
    this.showToast('success', title, body);
  }

  warning(body: string, title: string = 'Warning') {
    this.showToast('warning', title, body);
  }

  error(body: string, title: string = 'Error') {
    this.showToast('error', title, body);
  }

  clearToasts() {
    this.toasterService.clear();
  }
}
