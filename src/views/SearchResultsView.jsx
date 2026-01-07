import { PlantCard } from "/src/components/PlantCard.jsx";
import "/src/style/search.css";

export function SearchResultsView(props) {
  if (!props.searchResults || Object.values(props.searchResults).length === 0) {
    return (
      <div className="search-no-results">
        <p>
          Oops! No search results were found. Try searching for "Monstera" or "Fern"! 🌱
        </p>
      </div>
    );
  }

  function renderPlantCB(plant) {
    return (
      <div
        key={plant.id}
        className="plant-card-wrapper"
        onClick={() => props.onPlantSelect(plant)}
      >
        <PlantCard
          plant={plant}
          showAddToCollection={true}
          userCollections={props.userCollections}
          onAddToCollectionFunction={props.onAddToCollection}
          showSunDetails={true}
          showWatering={true}
        />
      </div>
    );
  }

  return (
    <div className="search-results-grid">
      {(Object.values(props.searchResults) || []).map(renderPlantCB)}
    </div>
  );
}