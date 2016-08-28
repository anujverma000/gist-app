import app from './app';

describe('app', () => {

  describe('GistAppCtrl', () => {
    let gistAppCtrl, forkServ, gistServ;

    beforeEach(() => {
      angular.mock.module(app);
      
      angular.mock.inject(function GetDependencies(gistService) {
        gistServ = gistService;
      });

      angular.mock.inject(function GetDependencies(forkService) {
        forkServ = forkService;
      });

      angular.mock.inject(($controller) => {
        gistAppCtrl = $controller(function GistAppCtrl() {
          this.gistService = gistServ;
          this.forkService = forkServ;
          this.username = 'test'
        }, {});
      });
    });

    it('should contain the username', () => {
      expect(gistAppCtrl.username).toBe('test');
    });
  });
});