import { resolvePromise } from "../api/resolvePromise.js";
import { makeAutoObservable } from "mobx";

import {
  doPlantSearchByQuery,
  doPlantSearchByCategory,
  getAllCategories,
} from "/src/api/getPlants.js";

class PlantPathModel {
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

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
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

  // Collection functions
  addPlant(plant, collectionName) {
    const collection = this.userCollections[collectionName];
    if (plant.id in collection) {
      collection[plant.id].changeQuantity(1);
      return;
    } else {
      collection[plant.id] = plant;
      this.waterPlant(collectionName, plant.id);
    }
  }

  removePlant(plantId, collectionName) {
    const id = String(plantId);

    if (
      this.userCollections[collectionName] &&
      this.userCollections[collectionName][id]
    ) {
      delete this.userCollections[collectionName][id];
      this.userCollections = { ...this.userCollections };

      if (
        this.wateringHistory[collectionName] &&
        this.wateringHistory[collectionName][id]
      ) {
        delete this.wateringHistory[collectionName][id];
        this.wateringHistory = { ...this.wateringHistory };
      }
    }
  }

  createCollection(collectionName) {
    if (!collectionName || this.userCollections[collectionName]) {
      return;
    } else {
      this.userCollections[collectionName] = {}; // empty collection
      this.wateringHistory[collectionName] = {};
    }
  }

  deleteCollection(collectionName) {
    if (collectionName in this.userCollections) {
      delete this.userCollections[collectionName];
    }
  }

  getCollectionPlants(collectionName) {
    const collection = this.userCollections[collectionName];
    return collection ? Object.values(collection) : [];
  }

  getCollectionNames() {
    return Object.keys(this.userCollections);
  }

  // Persistence methods
  getUserDataForPersistence() {
    return {
      userCollections: this.userCollections,
      wateringHistory: this.wateringHistory,
      lastUpdated: new Date().toISOString(),
    };
  }

  setUserData(data) {
    if (data) {
      this.userCollections = data.userCollections || {};
      this.wateringHistory = data.wateringHistory || {};
    } else {
      this.userCollections = {};
      this.wateringHistory = {};
    }
  }

  resetUserData() {
    this.user = null;
    this.userCollections = {};
    this.wateringHistory = {};
    this.currentPlant = null;
    this.ready = false;
    this.searchResultsPromiseState = {};
    this.categories = [];
    this.currentQuery = "";
    this.currentPlant = null;
    this.searchResults = [];
    this.searchError = null;
  }

  setToast(visible) {
    this.toastVisible = visible;
  }
  // Show pop up helper
  showToast(duration = 3000) {
    this.setToast(true);
    setTimeout(() => {
      this.setToast(false);
    }, duration);
  }

  // Watering functions
  waterPlant(
    collectionName,
    plantId,
    date = new Date().toISOString().slice(0, 10)
  ) {
    if (!this.wateringHistory[collectionName]) {
      this.wateringHistory[collectionName] = {};
    }

    // cannot water a date in the future
    if (date > new Date().toISOString().slice(0, 10)) {
      return;
    }

    if (!this.wateringHistory[collectionName][plantId]) {
      this.wateringHistory[collectionName][plantId] = [];
    }

    this.wateringHistory[collectionName][plantId].push(date);
    this.wateringHistory[collectionName][plantId] = this.wateringHistory[
      collectionName
    ][plantId].sort((a, b) => new Date(a) - new Date(b));

    this.showToast();
  }

  getWateringHistory(collectionName, plantId) {
    return this.wateringHistory[collectionName][plantId] || [];
  }

  getLastWateredDate(collectionName, plantId) {
    const history = this.wateringHistory[collectionName][plantId];
    if (!history || history.length === 0) return null;
    return history[history.length - 1];
  }

  getDaysUntilNextWatering(collectionName, plantId) {
    const wateringIntervalDays =
      this.userCollections[collectionName][plantId].wateringIntervalDays;
    let lastWateredDate = null;
    if (this.getLastWateredDate(collectionName, plantId)) {
      lastWateredDate = new Date(
        this.getLastWateredDate(collectionName, plantId)
      );
    } else {
      return wateringIntervalDays;
    }

    const today = new Date();
    const daysSinceWatering = Math.floor(
      (today - lastWateredDate) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceWatering >= wateringIntervalDays) {
      return 0;
    }

    const daysUntilNextWatering = wateringIntervalDays - daysSinceWatering;

    return daysUntilNextWatering;
  }
}

export const plantPathModel = new PlantPathModel();