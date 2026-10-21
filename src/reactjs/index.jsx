import { createRoot } from "react-dom/client";
import { reactiveMetaDataModel, reactivePlantPathModel } from "/src/model/reactiveModel.js";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";

const mountedApp = createRoot(document.getElementById("root"));
mountedApp.render(
  <ReactRoot
    plantPathModel={reactivePlantPathModel}
    metaDataModel={reactiveMetaDataModel}
  />
);
