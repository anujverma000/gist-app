/**
  ForkService
  Angular service to fetch details of forks of gists
  
  @author Anuj Verma
**/
export default class ForkService {
    constructor($http) {
        this.$http = $http;
    }
    getForks(url) {
		return this.$http.get(url);
    }
}