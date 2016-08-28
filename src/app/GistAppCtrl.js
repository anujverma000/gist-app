/**
  GistAPPCtrl
  Angular Controller for all UI actions and fetching of data for the user.

  @author Anuj Verma
**/

import {uniq, takeRight, reverse} from 'lodash'

export default class GistAppCtrl {
  constructor($scope, gistService, forkService) {
    this.gistService = gistService;
    this.forkService = forkService;
    this.username = "";
    this.fileContent = "";
    this.selectedGistFiles =[];
    this.selectedGist;
    this.selectedFile;
    this.message = "Please type the GitHub username and search public Gists."
  }

  /**
    Fetchs all the public gists of the users from GitHub Gist api.
    Formats the data and select the fist gist and first file in the gist.
    It also loads the content of the first file in the first gist.
  **/
  getPublicGists() {
    if(this.username){
      this.gistService.getUserGists(this.username).then(result => {
      	this.data = result.data
        if(this.data.length > 0){
        	this.gistTabs = this.getGistTabs(this.data)
          this.selectGist(this.gistTabs[0])
        	this.getGistForks()
        	/**
            Loading the content of first file in the first gist
          **/
        	let gistFiles = this.gistTabs[0].files;
        	let file = gistFiles[Object.keys(gistFiles)[0]];
          this.getFileContent(file)
        }else{
          this.message = "No Public Gists available."
          this.resetData();
        }
      }).catch(error => {
        this.message = "Can't find the User or Gists.";
        this.resetData();
      });
    }
  }

  resetData(){
    this.gistTabs = undefined;
    this.selectedFile = undefined;
    this.selectedGistFiles = undefined;
    this.selectedGist = undefined;
    this.fileContent = undefined;
  }

  /**
    Formats the data all the gists and figures out the file tags/badges in the gists

    @params data: Public Gists data
  **/
  getGistTabs(data) {
  	let gistTabs =[];
  	data.forEach((gist) => {
  		gist.name = Object.keys(gist.files)[0]
  		let tags =[]
  		Object.keys(gist.files).forEach(file => tags.push(gist.files[file].language))
  		gist.tags = uniq(tags)
		gistTabs.push(gist);
  	})
  	return gistTabs;
  }


  /**
    Fetchs the content of the file if contents are already loaded it will not load the content of the file.
    It also marks the file as seleted for UI

    @params file: file to selected from UI

  **/
  getFileContent(file){
    this.selectedFile = file
  	if(!file.fileContent){
      this.fileContent = ""
  		let index;
	  	this.gistTabs.some((gist, i) => {
	  		index = i;
	  		return gist.id === this.selectedGist.id
	  	})
	  	this.gistService.getGistContent(file.raw_url)
	  		.then(result => {
          this.gistTabs[index].files[file.filename].fileContent = result.data;
          this.fileContent = result.data;    
        })
  	}else{
      this.fileContent = file.fileContent
    }
  }

  /**
    Fetchs the forks of the all the gists and latest 3 gists are set picked from the list
    to display at UI.
  **/
  getGistForks() {
  	this.gistTabs.forEach(gist => 
  		this.forkService.getForks(gist.forks_url)
  			.then(result => gist.forks = reverse(takeRight(result.data, 3))))
  }

  /**
    Select the gist from the list of available gist and load the content of the first file as well.

    @params gist: gist to be selected

  **/
  selectGist(gist) {
    this.selectedGist = gist;
    this.selectedGistFiles = gist.files;
    this.selectedFile = this.selectedGistFiles[Object.keys(this.selectedGistFiles)[0]];
    this.getFileContent(this.selectedFile)
  }
}