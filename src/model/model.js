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

}