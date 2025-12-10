import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView";

export const Details = observer(function DetailsPresenter({ model }) {
  
  // If no plant is selected in the model, render nothing
  if (!model.currentPlant) {
    return null;
  }

  function handleClose() {
    model.setCurrentPlant(null);
  }

  function handleAddToCollection() {
    if (model.currentPlant) {
      model.addToCollection(model.currentPlant);
      // Optional: Close sidebar after adding
      // handleClose(); 
    }
  }

  // Check if plant is already in userPlants to disable the button or show "Saved"
  const isAdded = model.userPlants.some(p => p.id === model.currentPlant.id);

  return (
    <>
      {/* Clicking the dark overlay also closes the sidebar */}
      <div className="sidebar-overlay" onClick={handleClose}></div>
      
      <DetailsView
        plant={model.currentPlant}
        isLoggedIn={!!model.user}
        isAdded={isAdded}
        onClose={handleClose}
        onAddToCollection={handleAddToCollection}
      />
    </>
  );
});