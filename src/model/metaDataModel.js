import { makeAutoObservable, runInAction } from "mobx";
import { Plant } from "/src/model/plant.js";

class MetaDataModel {
  comments = {}; //A dictionary that acts as an array, but with the plant ID as the index.
  scores = []; //A sorted array (by plant score) that contains plant scores and ratings.
  currentComment = ""; //Current comment field, used to update comment display in view
  currentRating = 1; //Current rating field, used to update rating display in view
  ready = false; //If the model is currently ready to read from.
  ratedPlants = {};
  sideEffectsSetUp = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Sets the ready or not-state.
   * @param {Boolean} state Either true or false.
   */
  setReadyState(state) {
    this.ready = state;
  }

  /**
   * Sets the SESU state.
   * @param {Boolean} state Either true or false.
   */
  setSESUState(state) {
    this.sideEffectsSetUp = state;
  }

  /**
   * INIT FUNCTION:
   * Sets a comment object array to its key in the dictionary.
   * @param {String} key The plant ID.
   * @param {*} commentArr The comment object array to add.
   */
  setCommentFieldInit(key, commentArr) {
    const result = {};
    for (const user in commentArr) {
      result[user] = [];
      for (let i = 0; i < commentArr[user].length; i++) {
        const obj = {
          id: commentArr[user][i].id,
          plantID: commentArr[user][i].plantID,
          comment: commentArr[user][i].comment,
          name: commentArr[user][i].name,
          personID: commentArr[user][i].personID,
          date: new Date(
            commentArr[user][i].date.seconds * 1000 +
            commentArr[user][i].date.nanoseconds / 1000000
          ),
        };
        result[user].push(obj);
      }
    }
    this.comments[key] = result;
  }

  /**
   * Sets all plants a user has rated from DB info
   * @param {} obj A dictionary of all plants the user has rated.
   */
  setRatedPlantsInit(obj) {
    this.ratedPlants = obj;
  }

  /**
   * INIT FUNCTION:
   * Sets the score array.
   * @param {*} scoreArray The score array to set (gotten from DB).
   */
  setScoreArrayInit(scoreArray) {
    this.scores = [];
    for (let i = 0; i < scoreArray.length; i++) {
      function convertToAPIData(dbData) {
        const plainData = {
          id: dbData.id,
          ["Common name"]: dbData.commonName,
          ["Latin name"]: dbData.latinName,
          ["Family"]: dbData.family,
          ["Light tolered"]: dbData.lightTolered,
          ["Light ideal"]: dbData.lightIdeal,
          ["Img"]: dbData.img,
          ["Watering"]: dbData.watering,
          ["quantity"]: dbData.quantity,
          ["wateringIntervalDays"]: dbData.wateringIntervalDays,
          ["Pruning"]: dbData.pruning,
          ["sunConditions"]: dbData.sunConditions,
        };
        return new Plant(plainData);
      }
      const newPlant = {
        plant: convertToAPIData(scoreArray[i].plant),
        score: scoreArray[i].score,
        totalRating: scoreArray[i].totalRating,
        ratings: scoreArray[i].ratings,
        avgRating: scoreArray[i].avgRating,
      };
      this.scores = [...this.scores, newPlant];
    }
  }

  /**
   * Updates the current comment field.
   * @param {String} text The new text to set it to.
   */
  updateCommentText(text) {
    this.currentComment = text;
  }

  /**
   * Updates the current rating field.
   * @param {Number} val The new rating to set it to.
   */
  updateCurrentRatingValue(val) {
    if (val === "" || val === null) {
      this.currentRating = "";
      return;
    }
    let numVal = Number(val);
    if (numVal > 10) {
      numVal = 10;
    } else if (numVal < 1) {
      numVal = 1;
    }
    this.currentRating = numVal;
  }


  /**
   * Adds a new comment to a specific plant.
   * @param {String} comment The written comment. (Note: could probably use this.currentComment instead depending on later coding!)
   * @param {String} plantID The plant ID that the comment is reffering to.
   * @param {String} userName The name (or email maybe?) of the user that wrote the comment.
   * @param {String} userID The ID of the user that wrote the comment.
   */
  addNewComment(comment, plantID, userName, userID) {
    const newComment = {
      id: crypto.randomUUID(),
      plantID: plantID,
      comment: comment,
      name: userName,
      personID: userID,
      date: new Date(),
    };
    if (this.comments[plantID]) {
      if (this.comments[plantID][userID]) {
        this.comments[plantID][userID] = [
          ...this.comments[plantID][userID],
          newComment,
        ];
      } else {
        this.comments[plantID][userID] = [newComment];
      }
    } else {
      this.comments[plantID] = { [userID]: [newComment] };
    }
  }

  /**
   * Change the score of a plant (not rating!).
   * @param {Plant} plant The targeted plant.
   * @param {Number} factor The factor which to change the score by.
   */
  changeScore(plant, factor) {
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].plant?.id == plant.id) {
        this.scores[i].score += factor;
        this.scores.sort(this.compareScoresCB);
        return;
      }
    }
    //if no plant with that ID is found in score array, it needs to be added
    this.addPlantToScoreArray(plant, null, factor);
  }

  /**
   * Callback for comparing score objects in a score array.
   */
  compareScoresCB(a, b) {
    if (a.score < b.score) {
      return 1;
    } else if (a.score > b.score) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Adds plant to score array. Initializing for plants that were not present!
   * @param {Plant} plant The plant to add.
   * @param {number} rating The rating to initalize with (optional).
   * @param {number} score The score to initalize with (optional).
   */
  addPlantToScoreArray(plant, rating, score) {
    const newPlant = {
      plant: plant,
      score: score || 0,
      totalRating: rating || 0,
      ratings: rating ? 1 : 0,
      avgRating: rating || 0,
    };
    if (rating) {
      this.ratedPlants[plant.id] = true;
    }
    runInAction(() => {
      this.scores = [...this.scores, newPlant];
    });
  }

  /**
   * Updates the average rating for a plant.
   * @param {Plant} plant The plant to change the rating of.
   * @param {Number} rating The rating the user provided. (Note: could potentially use this.currentRating depending on code implementation!)
   * @return true if successful, false if user already rated (and data is consistent).
   */
  updateRating(plant, rating) {
    const numRating = Number(rating);
    const plantIdStr = String(plant.id);

    // Reject entirely if it's not a number between 1 and 10
    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 10) {
        console.warn("Invalid rating rejected:", rating);
        return false; 
    }

    let foundIndex = -1;
    for (let i = 0; i < this.scores.length; i++) {   // Check if plant exists in score array
      if (String(this.scores[i].plant?.id) === plantIdStr) {
        foundIndex = i;
        break;
      }
    }
    // If we have rated it (ratedPlants=true) AND it exists in scores (foundIndex != -1), BLOCK IT.
    if (this.ratedPlants[plantIdStr] && foundIndex !== -1) {
      return false;
    }
    // so if didn't get blocked, we haven't rated it, or the score is missing, 
    if (foundIndex !== -1) {
      runInAction(() => {
        this.scores[foundIndex].totalRating += numRating;
        this.scores[foundIndex].ratings += 1;
        this.scores[foundIndex].avgRating = this.scores[foundIndex].totalRating / this.scores[foundIndex].ratings;
        this.ratedPlants[plantIdStr] = true;
      });
    } else {
      this.addPlantToScoreArray(plant, numRating, null);
    }
    return true;
  }

  getAvgRating(plant) {
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].plant?.id == plant.id) {
        return this.scores[i].avgRating;
      }
    }
    return undefined; //plant does not exist in score array
  }

  getScore(plant) {
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].plant?.id == plant.id) {
        return this.scores[i].score;
      }
    }
    return undefined; //plant does not exist in score array
  }

  getTopPlants(amount) {
    return [...this.scores.slice(0, amount)];
  }

  getIfUserHasRatedPlant(plantID) {
    return this.ratedPlants[plantID];
  }

  /**
   * Gets all the plant comments for a specific plant.
   * @param {String} plantID The plant ID to get comments for.
   * @returns A dictionary, where each userID is the key to an array of all their comment objects.
   */
  getAllCommentsByPlant(plantID) {
    return this.comments[plantID];
  }

  getAllCommentsByPlantSortedArray(plantID) {
    const commentArray = [];
    function byDateCB(a, b) {
      if (a.date > b.date) {
        return -1
      } else if (a.date < b.date) {
        return 1
      } else {
        return 0
      }
    }
    for (const user in this.comments[plantID]) {
      const arr = this.comments[plantID][user];
      for (let i = 0; i < arr.length; i++) {
        commentArray.push(arr[i]);
      }
    }
    commentArray.sort(byDateCB);
    return commentArray;
  }

  clearData() {
    this.comments = {};
    this.scores = [];
    this.currentComment = "";
    this.currentRating = 1;
    this.ready = false;
    this.ratedPlants = {};
  }

  getRatingsAmount(plant) {
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].plant?.id == plant.id) {
        return this.scores[i].ratings;
      }
    }
    return undefined; //plant does not exist in score array
  }
}

export const metaDataModel = new MetaDataModel();

