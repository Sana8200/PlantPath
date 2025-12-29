

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

  setReadySate(state){
    this.ready = state;
  }

  setSideEffectState(state){
    this.sideEffectSetup = state;
  }

   /**
   * INIT FUNCTION:
   * Sets a comment object array to its key in the dictionary.
   * @param {String} key The plant ID.
   * @param {*} commentArr The comment object array to add.
   */
  setCommentFieldInit(key, commentArr) {
    const result = {};
    for (const user in commentArr) {
      result[user] = [];
      for (let i = 0; i < commentArr[user].length; i++) {
        const obj = {
          id: commentArr[user][i].id,
          plantID: commentArr[user][i].plantID,
          comment: commentArr[user][i].comment,
          name: commentArr[user][i].name,
          personID: commentArr[user][i].personID,
          date: new Date(
            commentArr[user][i].date.seconds * 1000 +
            commentArr[user][i].date.nanoseconds / 1000000
          ),
        };
        result[user].push(obj);
      }
    }
    this.comments[key] = result;
  }

}