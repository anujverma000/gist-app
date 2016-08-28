/**
  GistService
  Angular service to fetch details and file contents of the gist

  @author Anuj Verma
**/
export default class GistService {
    constructor($http) {
        this.$http = $http;
    }
    getUserGists(username) {
      return this.$http.get('https://api.github.com/users/'+username+'/gists');
    }

    getGistContent(url) {
		return this.$http.get(url);
    }
}