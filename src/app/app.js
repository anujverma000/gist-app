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
    controller: 'gistAppCtrl',
    controllerAs: 'app'
  }
};

angular.module(MODULE_NAME, [])
  .directive('gistApp', app)
  .service('gistService', GistService)
  .service('forkService', ForkService)
  .controller('gistAppCtrl', GistAppCtrl);

export default MODULE_NAME;