import { makeAutoObservable, runInAction } from "mobx";
import { getPlantFromTrefle, getPlantByID, doPlantSearchByCategory } from "./api/getPlants";

class LeafKeeperModel {
    constructor(userPlants = [], user = null) {
        // STATE DATA
        // 1. External Data (Search results, etc.)
        this.searchResults = [];
        this.currentPlant = null;

        // 2. App-Specific Data (User-Generated) 
        // Stores saved plants, watering schedule, etc. 
        this.userPlants = userPlants;

        // User auth state
        this.user = user;

        // UI State
        this.loading = false;
        this.error = null;

        makeAutoObservable(this);
    }

    // --- ACTIONS ---

    // Search logic for "Search and browse through different plants"
    async setSearchQuery(query) {
        this.loading = true;
        try {
            const results = await getPlantFromTrefle(query);
            runInAction(() => {
                // Trefle API returns data in a 'data' property
                this.searchResults = results && results.data ? results.data : [];
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = err;
                this.loading = false;
            });
        }
    }

    async searchPlantById(id) {
        this.loading = true;
        try {
            const result = await getPlantByID(id);
            runInAction(() => {
                this.searchResults = result ? [result] : [];
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = err;
                this.loading = false;
            });
        }
    }

    async searchPlantsByCategory(category) {
        this.loading = true;
        try {
            const results = await doPlantSearchByCategory(category);
            runInAction(() => {
                this.searchResults = results || [];
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = err;
                this.loading = false;
            });
        }
    }

    // Select a plant to view details
    setCurrentPlant(plant) {
        this.currentPlant = plant;
    }

    // Save plant to "My Collections"
    addToCollection(plant) {
        if (!this.userPlants.find(p => p.id === plant.id)) {
            // Initialize app-specific data for this plant
            const newMyPlant = {
                ...plant,
                dateAdded: new Date(),
                wateringsDone: [], // Track history 
                nextWatering: null, // For reminders
            };
            this.userPlants.push(newMyPlant);
        }
    }

    removeFromCollection(plantId) {
        this.userPlants = this.userPlants.filter(p => p.id !== plantId);
    }

    // Logic for "Keep track of when you last watered your plants"
    waterPlant(plantId) {
        const plant = this.userPlants.find(p => p.id === plantId);
        if (plant) {
            const now = new Date();
            // Add to history (Calendar-like format data) 
            plant.wateringsDone.push(now);

            // Logic to calculate next reminder would go here
            // plant.nextWatering = calculateNextDate(now, plant.care.watering);

            // In MobX, modifying the object property is enough if the object is observable
            // Since userPlants is observable, its elements are too (deep observation by default)
        }
    }


}

export default LeafKeeperModel;