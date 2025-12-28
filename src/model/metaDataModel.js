

class MetaDataModel{
    comments = {};
    scores = [];
    currentComment = "";
    currentRating = 1;
    ready = false;
    sideEffectSetup = false;

    constructor() {
    makeAutoObservable(this);
  }

}