import { CollectionsPage } from "../views/collectionsView";
import { observer } from "mobx-react-lite";
import "/src/style/toast.css";

export const Collections = observer(function CollectionsRender({ model }) {
  const isLoggedIn = !!model.user;

  const historySubscription = model.wateringHistory;
  const collectionKeys = Object.keys(model.userCollections);

  function handleAddNewCollectionACB() {
    const newCollectionName = prompt("Enter new collection name:");
    if (newCollectionName == "ratingsRESERVED") {
      window.confirm("That name is not allowed. Please choose another.");
    } else if (newCollectionName && newCollectionName.trim()) {
      model.createCollection(newCollectionName.trim());
    }
  }

  function handleDeleteCollectionACB(collectionName) {
    if (
      window.confirm(
        `Are you sure you want to delete the collection "${collectionName}"?`
      )
    ) {
      model.deleteCollection(collectionName);
    }
  }

  function handleRemovePlant(plantId, collectionName) {
    const confirmed = window.confirm(
      `Are you sure you want to remove this plant from your collection?`
    );
    if (!confirmed) return;
    model.removePlant(plantId, collectionName);
  }

  function handlePlantClick(plant) {
    model.setCurrentPlant(plant);
  }

  function handleWateredDateChange(collectionName, plantId, date) {
    if (
      model.userCollections[collectionName] &&
      model.userCollections[collectionName][plantId]
    ) {
      model.waterPlant(collectionName, plantId, date);
    }
  }

  function handleGetLastWateredDate(collectionName, plantId) {
    return model.getLastWateredDate(collectionName, plantId);
  }

  function handleGetDaysUntilNextWatering(collectionName, plantId) {
    return model.getDaysUntilNextWatering(collectionName, plantId);
  }

  return (
    <>
      <CollectionsPage
        isLoggedIn={isLoggedIn}
        userCollections={model.userCollections}
        onAddCollection={handleAddNewCollectionACB}
        onDeleteCollection={handleDeleteCollectionACB}
        onRemovePlant={handleRemovePlant}
        onPlantClick={handlePlantClick}
        onGetLastWateredDate={handleGetLastWateredDate}
        onWateredDateChange={handleWateredDateChange}
        onGetDaysUntilNextWatering={handleGetDaysUntilNextWatering}
      />
      {model.toastVisible && (
        <div className="toast">Plant watered successfully! 🌱</div>
      )}
    </>
  );
});