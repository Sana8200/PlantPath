import { metaDataModel } from "/src/model/metaDataModel.js";
import { PlantPathModel } from "/src/model/model.js";
import { connectToPersistence } from "/src/model/firebaseModel.js";

export const reactivePlantPathModel = PlantPathModel;
export const reactiveMetaDataModel = metaDataModel;

connectToPersistence(reactivePlantPathModel, reactiveMetaDataModel);