export class AppSettings {

  private static _storedUrl = '';
  public static get ApiEndPoint() {
    if (!AppSettings._storedUrl) {
      const url = new URL(window.location.href);
      if (url.origin === 'http://localhost:4200') {
        AppSettings._storedUrl = 'http://localhost:5000';
      } else {
        AppSettings._storedUrl = url.origin;
      }
    }
    return AppSettings._storedUrl;
  }
  public static BuildUrl(url: string) {
    return AppSettings.CombineUrl(AppSettings.ApiEndPoint, url);
  }

  public static CombineUrl(base: string, path: string) {
    return (base + '/' + path).replace(/([^:])\/\//g, '$1/');
  }
}
