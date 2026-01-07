import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView.jsx";
import "/src/style/style.css";

export const Details = observer(function DetailsPresenter({ model, metaDataModel, }) {
  const plant = model.currentPlant;

  if (!plant) {
    return null;
  }

  const isLoggedIn = !!model.user;

  // Check if plant is in any collection
  function getPlantCollectionInfo(plantId) {
    for (const collectionName of model.getCollectionNames()) {
      const plants = model.getCollectionPlants(collectionName);
      const found = plants.find((p) => p.id === plantId);
      if (found) {
        return {
          isInCollection: true,
          collectionName: collectionName,
          quantity: found.quantity,
        };
      }
    }
    return { isInCollection: false, collectionName: null, quantity: 0 };
  }

  const collectionInfo = getPlantCollectionInfo(plant.id);
  const isAdded = collectionInfo.isInCollection;

  // Get watering info if plant is in collection
  let lastWateredDate = null;
  let daysUntilNextWatering = null;
  let wateringHistory = [];

  if (isAdded && collectionInfo.collectionName) {
    lastWateredDate = model.getLastWateredDate(
      collectionInfo.collectionName,
      plant.id
    );
    daysUntilNextWatering = model.getDaysUntilNextWatering(
      collectionInfo.collectionName,
      plant.id
    );
    wateringHistory = model.getWateringHistory(
      collectionInfo.collectionName,
      plant.id
    );
  }

  function handleClose() {
    model.setCurrentPlant(null);
  }

  function handleAddToCollection() {
    if (!plant) return;
    let collectionName = model.getCollectionNames()[0];
    if (!collectionName) {
      model.createCollection("My Plants");
      collectionName = "My Plants";
    }
    model.addPlant(plant, collectionName);
    metaDataModel.changeScore(plant, 1);
  }

  function updateCommentTextACB(text) {
    const value = text.target.value;
    metaDataModel.updateCommentText(value);
  }

  function updateRatingValueACB(evt) {
    const value = evt.target.value;
    if (value === "") {
      metaDataModel.updateCurrentRatingValue("");  // allow deletion 
    } else {
      metaDataModel.updateCurrentRatingValue(Number(value));
    }
  }

  function setCommentACB() {
    if (!metaDataModel.currentComment.trim()) return; // not submitting empty comments 
    if (model.user) {
      metaDataModel.addNewComment(
        metaDataModel.currentComment,
        plant.id,
        model.user.email,
        model.user.uid
      );
    } else {
      console.warn("Did not add comment, user is not logged in!");
      alert("Please log in to add a comment!");
    }
    metaDataModel.updateCommentText("");
  }

  function setRatingACB() {
    if (model.user) {
      const success = metaDataModel.updateRating(plant, metaDataModel.currentRating);

      if (success) {
        metaDataModel.updateCurrentRatingValue(1); // Reset input on success
      } else {
        alert("You have already rated this plant!");
      }
    }
    else {
      console.warn("Did not add rating, user is not logged in.");
    }
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={handleClose}></div>
      <DetailsView
        plant={plant}
        isLoggedIn={isLoggedIn}
        isAdded={isAdded}
        sunConditions={plant.sunConditions}
        collectionName={collectionInfo.collectionName}
        quantity={collectionInfo.quantity}
        lastWateredDate={lastWateredDate}
        daysUntilNextWatering={daysUntilNextWatering}
        wateringHistory={wateringHistory}
        onClose={handleClose}
        onAddToCollection={handleAddToCollection}
        comments={metaDataModel.getAllCommentsByPlantSortedArray(plant.id)}
        score={metaDataModel.getScore(plant)}
        avgRating={metaDataModel.getAvgRating(plant)}
        commentText={metaDataModel.currentComment}
        ratingValue={metaDataModel.currentRating}
        changeCommentTextACB={updateCommentTextACB}
        changeRatingValueACB={updateRatingValueACB}
        addCommentACB={setCommentACB}
        addRatingACB={setRatingACB}
        pruningInfo={plant.pruningInfo}
        ratingsCount={metaDataModel.getRatingsAmount(plant)}
      />
    </>
  );
});
