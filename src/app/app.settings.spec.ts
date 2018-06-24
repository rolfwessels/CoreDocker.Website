import { AppSettings } from './app.settings';



describe('Class: AppSettings', () => {


  describe('when calling BuildUrl with path without slash', () => {
    it('should add slash', () => {
      const url = AppSettings.BuildUrl('sample');
      expect(url).toMatch('/sample$');
    });
  });

  describe('when calling BuildUrl with path with slash', () => {
    it('should add slash', () => {
      const url = AppSettings.BuildUrl('/sample');
      expect(url).toMatch('/sample$');
    });
  });

  describe('when calling CombineUrl ', () => {

    it('should add slash if missing in path', () => {
      const url = AppSettings.CombineUrl('http://test.com', 'sample');
      expect(url).toMatch('http://test.com/sample');
    });

    it('should not add double if exists in path', () => {
      const url = AppSettings.CombineUrl('http://test.com', '/sample');
      expect(url).toMatch('http://test.com/sample');
    });
  });



});
