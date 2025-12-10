import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView";
import "/src/style/style.css";

export const Details = observer(function DetailsPresenter({ model }) {
  if (!model.currentPlant) return null;

  function handleClose() {
    model.setCurrentPlant(null);
  }

  function handleAddToCollection() {
    if (model.currentPlant) {
      model.addToCollection(model.currentPlant);
    }
  }

  const isAdded = model.userPlants.some(p => p.id === model.currentPlant.id);

  return (
    <>
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