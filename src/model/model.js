import { makeAutoObservable } from "mobx";


class plantPathModel{
    user = null;
  ready = false;
  userCollections = {};
  wateringHistory = {};
  searchResultsPromiseState = {};
  categories = [];
  currentQuery = "";
  currentPlant = null;
  searchResults = [];
  sideEffectsSetUp = false;
  toastVisible = false;
  searchError = null;

  constructor(){
    makeAutoObservable(this);
  }

  setUser(user){
    this.user = user;
  }

  setReadyState(ready) {
    this.ready = ready;
  }

  setSESUState(state) {
    this.sideEffectsSetUp = state;
  }

  // Plant Selection
  setCurrentPlant(plant) {
    this.currentPlant = plant;
  }

  // Search functions
  setCurrentQuery(query) {
    if (typeof query !== 'string') {
      this.searchError = "Invalid input type";
      return;
    }
    this.searchError = null;
    this.currentQuery = query;
  }

  doSearchByQuery() {
    const trimmedQuery = this.currentQuery.trim();
    if (!trimmedQuery) {
      this.searchError = "Please enter a plant name to search.";
      return;
    }
    if (trimmedQuery.length < 2) {   // minimum length like 2 for huge result sets ?! We can ignore it if it's not ok 
      this.searchError = "Search query is too short.";
      return;
    }
    const promise = doPlantSearchByQuery(trimmedQuery);
    resolvePromise(promise, this.searchResultsPromiseState);
  }


  doSearchByCategory(catagory) {
    if (!catagory) {
      this.searchResults = [];
      return;
    }
    resolvePromise(
      doPlantSearchByCategory(catagory),
      this.searchResultsPromiseState
    );
  }


  loadCategories() {
    resolvePromise(getAllCategories(), this.searchResultsPromiseState);
  }




  

}