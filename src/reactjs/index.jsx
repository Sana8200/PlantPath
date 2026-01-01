import { createRoot } from "react-dom/client";
import { reactiveMetaDataModel, reactiveLeafKeeperModel} from "/src/model/reactiveModel.js";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";


// debugging
window.myModel = reactiveLeafKeeperModel;
window.myMetaDataModel = reactiveMetaDataModel;

console.log("✅ SUCCESS: Model has been attached to window.myModel"); //debugging
const mountedApp = createRoot(document.getElementById("root"));
mountedApp.render(
  <ReactRoot
    leafKeeperModel={reactiveLeafKeeperModel}
    metaDataModel={reactiveMetaDataModel}
  />
);


