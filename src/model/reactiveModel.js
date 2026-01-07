import { metaDataModel } from "/src/model/metaDataModel.js";
import { plantPathModel } from "/src/model/model.js";
import { connectToPersistence } from "/src/model/firebaseModel.js";

export const reactivePlantPathModel = plantPathModel;
export const reactiveMetaDataModel = metaDataModel;

connectToPersistence(reactivePlantPathModel, reactiveMetaDataModel);