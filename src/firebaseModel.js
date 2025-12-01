import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig.js";

const db = getFirestore(app);

const COLLECTION = "users";

// Save user data to Firestore
export async function saveUserData(userId, data) {
  const userDoc = doc(db, COLLECTION, userId);
  await setDoc(userDoc, data, { merge: true });
}

// Load user data from Firestore
export async function loadUserData(userId) {
  const userDoc = doc(db, COLLECTION, userId);
  const snapshot = await getDoc(userDoc);
  return snapshot.exists() ? snapshot.data() : null;
}

// Connect model to Firestore persistence 
export function connectToPersistence(model, userId, watchFunction) {
  const userDoc = doc(db, COLLECTION, userId);

  model.ready = false;

  // Loading initial data
  getDoc(userDoc)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        // Updating here with data we have 
        // model.someProperty = data.someProperty;
      }
      model.ready = true;
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      model.ready = true;
    });

  // Watch for changes and save
  function getDataToSave() {
    // Data we want to persist
    return {
      // someProperty: model.someProperty,
    };
  }

  function saveData() {
    if (!model.ready) return;
    setDoc(userDoc, getDataToSave(), { merge: true });
  }

  watchFunction(getDataToSave, saveData);
}
