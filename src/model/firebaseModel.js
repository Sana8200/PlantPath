import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { reaction } from "mobx";
import app from "./firebaseConfig.js";
import { Plant } from "./Plant.js";
import { onAuthChange } from "/src/services/AuthService.js";

const db = getFirestore(app);
let disposers = [];

// Connect model to Firestore persistence
export function connectToPersistence(plantPathModel, metaDataModel) {
  onAuthChange(logInOrOutHandlingACB);
  function logInOrOutHandlingACB(user) {
    if (user) {
      plantPathModel.setReadyState(false);
      metaDataModel.setReadyState(false);

      const userDoc = doc(db, "users", user.uid);
      const metaCol = collection(db, "metadata");
      const scoreDoc = doc(db, "metadata", "scores");

      getDoc(userDoc)
        .then(setInitDataACB)
        .then(setUpSideEffectLKMACB)
        .catch(handleErrorACB);
      getDocs(metaCol)
        .then(setMetaDataACB)
        .then(setUpSideEffectMMACB)
        .catch(handleErrorACB);

      /* FUNCTIONS */
      /**
       * Sets the initializing data for the plantPathModel model, with the data from the database;
       * @param {*} result The result from the getDoc function.
       */
      function setInitDataACB(result) {
        try {
          const resultData = result.data();
          const userData = {
            userCollections: {},
            wateringHistory: {},
          };
          function savePerCollectionCB(key) {
            if (key == "ratingsRESERVED") {
              const arr = resultData["ratingsRESERVED"];
              const obj = {};
              for (let i = 0; i < arr.length; i++) {
                obj[arr[i]] = true;
              }
              metaDataModel.setRatedPlantsInit(obj);
            } else {
              userData.userCollections[key] = {};
              userData.wateringHistory[key] = {};
              function savePerPlant(plant) {
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
                userData.userCollections[key][plant] = convertToAPIData(resultData[key][plant]);
                userData.wateringHistory[key][plant] = resultData[key][plant].wateredDates;
              }
              plantPathModel.createCollection(key);
              Object.keys(resultData[key]).forEach(savePerPlant);
            }
          }
          if (resultData) {
            Object.keys(resultData).forEach(savePerCollectionCB);
            plantPathModel.setUserData(userData);
          }
          plantPathModel.setReadyState(true);
        } catch (error) {
          console.error("Error initialising LKM values: ", error);
          plantPathModel.setReadyState(true); // Still set ready so app can function
        }
      }

      /**
       * Sets the initializing data for the metadata model, with the data from the database;
       * @param {*} result The result from the getDoc function.
       */
      function setMetaDataACB(result) {
        try {
          const resultData = {};
          function mapDocsToResultCB(doc) {
            resultData[doc.id] = doc.data();
          }
          function mapResultToCommentArrayCB(key) {
            if (key == "scores") {
              return;
            }
            metaDataModel.setCommentFieldInit(key, resultData[key]);
          }
          result.docs.forEach(mapDocsToResultCB);
          Object.keys(resultData).forEach(mapResultToCommentArrayCB);

          // Add null checks for scores
          if (resultData.scores && resultData.scores.scores && Array.isArray(resultData.scores.scores)) {
            metaDataModel.setScoreArrayInit(resultData.scores.scores);
          } else {
            console.warn("No scores found in database, initializing with empty array");
            metaDataModel.setScoreArrayInit([]);
          }

          metaDataModel.setReadyState(true);
        } catch (error) {
          console.error("Error initialising metadata values: ", error);
          metaDataModel.setReadyState(true); // FIXED: Still set ready so app can function
        }
      }

      /**
       * Handles the error thrown with an ACB. Currently just prints it out.
       * @param {*} error The error that was thrown.
       */
      function handleErrorACB(error) {
        console.error("Error getting data: ", error);
      }

      /**
       * Gets the persistant parts of the plantPathModel model.
       * @returns An array of all the persistant props.
       */
      function getPersistPropsLKMACB() {
        const allPlants = [];
        for (const collection of Object.values(plantPathModel.userCollections)) {
          for (const plant of Object.values(collection)) {
            allPlants.push(
              plant.id,
              plant.commonName,
              plant.latinName,
              plant.family,
              plant.lightTolered,
              plant.lightIdeal,
              plant.img,
              plant.watering,
              plant.quantity,
              plant.wateringIntervalDays,
              plant.pruning,
              plant.sunConditions
            );
          }
        }
        for (const collection of Object.values(plantPathModel.wateringHistory)) {
          for (const plant of Object.values(collection)) {
            allPlants.push(plant.length);
          }
        }
        allPlants.push(Object.keys(metaDataModel.ratedPlants).length);
        return allPlants;
      }

      /**
       * Gets the persistant props of all comments.
       * @returns An array of the comments.
       */
      function getPersistPropsCommentsACB() {
        const allComments = [];

        for (const plantID in metaDataModel.comments) {
          const users = metaDataModel.comments[plantID];
          for (const userID in users) {
            allComments.push(...users[userID]);
          }
        }
        return allComments;
      }

      /**
       * Gets the persistant props of the scores.
       * @returns The scores only in an array.
       */
      function getPersistPropsScoresACB() {
        const allValues = [];

        for (let i = 0; i < metaDataModel.scores.length; i++) {
          allValues.push(metaDataModel.scores[i].score);
          allValues.push(metaDataModel.scores[i].avgRating);
          allValues.push(metaDataModel.scores[i].totalRating);
          allValues.push(metaDataModel.scores[i].ratings);
        }
        allValues.push(metaDataModel.scores.length);

        return allValues;
      }

      /**
       * Saves the metadata model to the database. The comments are stored per plant, in an array per user. This makes sure no users will overwrite each others data.
       */
      function saveCommentsACB() {
        if (metaDataModel.ready == true) {
          try {
            function setDocsCB(key) {
              if (metaDataModel.comments[key][user.uid]) {
                const tDoc = doc(db, "metadata", key);
                setDoc(
                  tDoc,
                  { [user.uid]: metaDataModel.comments[key][user.uid] },
                  { merge: true }
                ); //Should only write comment by this user to database
              }
            }
            Object.keys(metaDataModel.comments).forEach(setDocsCB); //saves all comment arrays as separate documents, by plant and user id.
          } catch (error) {
            console.error("Error saving metadata to database: ", error);
          }
        } else {
          console.warn("Not saving metadata (comments) to database, model is busy!");
        }
      }

      /**
       * Saves the new score list to the database.
       * WARNING! This does not check for updated score lists. Multiple users could modify the same list, which would cause data to be overwritten.
       * Not an urgent issue, but checking for updated database data for the score array and modifying the local score array could be needed.
       */
      function saveScoresACB() {
        try {
          if (metaDataModel.ready == true) {
            const scoreObj = { scores: [] };
            for (let i = 0; i < metaDataModel.scores.length; i++) {
              const obj = {};
              const score = metaDataModel.scores[i];
              if (score && score?.plant && obj) {
                obj.plant = score.plant.makeSaveableObject();
                obj.score = score.score;
                obj.totalRating = score.totalRating;
                obj.ratings = score.ratings;
                obj.avgRating = score.avgRating;
                scoreObj.scores.push(obj);
              }
            }
            const scoresDoc = doc(db, "metadata", "scores");
            setDoc(scoresDoc, scoreObj || { scores: [] }, { merge: true });
          }
        } catch (error) {
          console.error("Error saving scores: ", error);
        }
      }

      /**
       * Saves the plantPathModel to the database.
       */
      function saveModelLKMACB() {
        let success = false;
        if (plantPathModel.ready == true) {
          const saveObj = {};
          function saveToCollectionsCB(collKey) {
            saveObj[collKey] = {};
            for (const plant in plantPathModel.userCollections[collKey]) {
              saveObj[collKey][plant] = plantPathModel.userCollections[collKey][plant].makeSaveableObject();
              saveObj[collKey][plant]["wateredDates"] = plantPathModel.wateringHistory[collKey][plant] || [];
            }
          }
          try {
            Object.keys(plantPathModel.userCollections).forEach(saveToCollectionsCB);
            if (Object.keys(saveObj).length > 0) {
              setDoc(userDoc, saveObj, { merge: false });
              success = true;
            } 
          } catch (error) {
            console.error("Error saving to database: ", error);
            success = false;
          }
        } else {
          console.warn("Not saving LKM to database, model is busy!");
        }
        if (metaDataModel.ready == true) {
          const arr = [];
          function pushToArrCB(key) {
            arr.push(key);
          }
          Object.keys(metaDataModel.ratedPlants).forEach(pushToArrCB);
          try {
            setDoc(userDoc, { ratingsRESERVED: arr }, { merge: true });
          } catch (error) {
            console.error("Error saving ratedPlants to DB: ", error);
          }
        } else {
          if (success) {
            console.error("Warning: saved LKM but not ratedPlants. Rated plant array is now local-only until it manages to be saved!");
          } else {
            console.warn("Not saving ratings array to database, model is busy!");
          }
        }
      }

      function setUpSideEffectLKMACB() {
        if (plantPathModel.sideEffectsSetUp == false) {
          disposers.push(reaction(getPersistPropsLKMACB, saveModelLKMACB));
          plantPathModel.setSESUState(true);
        }
      }

      function setUpSideEffectMMACB() {
        if (metaDataModel.sideEffectsSetUp == false) {
          disposers.push(reaction(getPersistPropsScoresACB, saveScoresACB));
          disposers.push(reaction(getPersistPropsCommentsACB, saveCommentsACB));
          disposers.push(connectToSnapshotListenACB());
          metaDataModel.setSESUState(true);
        }
      }

      function connectToSnapshotListenACB() {
        const unsubscribe = onSnapshot(
          scoreDoc,
          updateScoreArrayACB,
          handleErrorACB
        );
        return unsubscribe;
      }

      function updateScoreArrayACB(snapshot) {
        if (!metaDataModel.ready) {
          return;
        }
        const data = snapshot.data();
        // FIXED: Add null check for snapshot data
        if (data && data.scores && Array.isArray(data.scores)) {
          metaDataModel.setReadyState(false);
          metaDataModel.setScoreArrayInit(data.scores);
          metaDataModel.setReadyState(true);
        }
      }

    } else {
      for (let i = 0; i < disposers.length; i++) {
        disposers[i]();
      }
      disposers = [];
      plantPathModel.setReadyState(false); //makes sure it does not save the cleared model to db
      plantPathModel.resetUserData();
      plantPathModel.setSESUState(false);

      metaDataModel.setReadyState(false);
      metaDataModel.clearData();
      metaDataModel.setSESUState(false);
    }
  }

  if (plantPathModel.user) {
    logInOrOutHandlingACB(plantPathModel.user);
  }
}