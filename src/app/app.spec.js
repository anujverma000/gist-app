import app from './app';

describe('app', () => {

  describe('GistAppCtrl', () => {
    let ctrl, forkService, gistService;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller, $service) => {
        ctrl = $controller('GistAppCtrl', {});
        forkService = $service('ForkService', {});
        gistService = $service('GistService', {});
      });
    });

    it('should contain the username', () => {
      expect(ctrl.username).toBe('ktmud');
    });
  });
});