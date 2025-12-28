import { getFirestore } from "firebase/firestore";
import { reaction } from "mobx";
import app from "./firebaseConfig";
import { plant } from "./plant.js";
import { onAuthChange } from "/src/services/AuthService.js";

const database = getFirestore(app);
let disposers = [];

// connect model to firestore persistence
export function connectToPersistence(plantPathModel, metaDataModel){
  
}

