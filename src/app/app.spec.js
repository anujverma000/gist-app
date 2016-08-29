import app from './app';
import GistAppCtrl from './GistAppCtrl.js';
describe('app', () => {

  describe('GistAppCtrl', () => {
    let vm;
    beforeEach(() => {
        angular.mock.module(app);
        vm = new GistAppCtrl();

        angular.mock.inject(gistService => vm.gistService = gistService);
        angular.mock.inject(forkService => vm.forkService = forkService);

        spyOn(vm, 'getPublicGists')

        vm.getPublicGists()
    });

    it('should have called getPublicGists() method', () => {
      expect(vm.getPublicGists).toHaveBeenCalled();
    })

    it('should contain the empty username', () => {
      expect(vm.username).toBe('');
    });

    it('should reset all the data', () =>{
      describe('GistAppCtrl', () => {
          beforeEach(() => {
            spyOn(vm, 'resetData')
            vm.resetData();
          })
          it('should clear the data from all the vaiables' ,() => {
            expect(vm.resetData).toHaveBeenCalled();
            expect(vm.gistTabs).toBe(undefined);

          })
      });
    })

  });
});