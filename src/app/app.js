import angular from 'angular';
import GistAppCtrl from './GistAppCtrl'
import GistService from './GistService'
import ForkService from './ForkService'
import appTemplate from './app.html'
import '../style/app.css';

const MODULE_NAME = 'gistApp';

let app = () => {
  return {
    template: appTemplate,
    controller: 'GistAppCtrl',
    controllerAs: 'app'
  }
};

angular.module(MODULE_NAME, [])
  .directive('gistApp', app)
  .service('gistService', GistService)
  .service('forkService', ForkService)
  .controller('GistAppCtrl', GistAppCtrl);

export default MODULE_NAME;