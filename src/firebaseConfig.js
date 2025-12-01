import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ61K64lUScBca7M30aVwi_pThmhpItM4",
  authDomain: "group-11-57e70.firebaseapp.com",
  projectId: "group-11-57e70",
  storageBucket: "group-11-57e70.firebasestorage.app",
  messagingSenderId: "958791237982",
  appId: "1:958791237982:web:28c198d7b4eeca44298fcf",
  measurementId: "G-81LD7CNNXQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;