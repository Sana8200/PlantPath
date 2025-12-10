import React from "react";
import { ReactRoot } from "./ReactRoot";
import { createRoot } from "react-dom/client";
import LeafKeeperModel from "../leafKeeperModel.js";

// Initialize the Reactive Model (Application State)
const model = new LeafKeeperModel();

model.searchPlantById("53417c12-4824-5995-bce0-b81984ebbd1d");

// This is a simplified example of how you might reload data
// if (localStorage.getItem("leafKeeperData")) {
//    model.userPlants = JSON.parse(localStorage.getItem("leafKeeperData"));
// }
window.myModel = model;
console.log("✅ SUCCESS: Model has been attached to window.myModel"); //debugging
const mountedApp = createRoot(document.getElementById("root"));
mountedApp.render(<ReactRoot model={model} />);

// Pass the model as a prop to the components used
// We create a temporary view to prove the model works


