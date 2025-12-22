import { metaDataModel } from "/src/model/metaDataModel.js";
import { leafKeeperModel } from "/src/model/model.js";
import { connectToPersistence } from "/src/model/firebaseModel.js";

export const reactiveLeafKeeperModel = leafKeeperModel;
export const reactiveMetaDataModel = metaDataModel;

connectToPersistence(reactiveLeafKeeperModel, reactiveMetaDataModel);