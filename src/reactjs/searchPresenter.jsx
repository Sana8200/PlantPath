import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/SearchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import "/src/style/search.css";

export const Search = observer(function SearchRender(props) {
  const promiseState = props.model.searchResultsPromiseState;
  const userCollections = props.model.userCollections;

  const validationError = props.model.searchError;
  const currentQuery = props.model.currentQuery;

  const ownedPlantIds = new Set();
  if (userCollections) {
    Object.values(userCollections).forEach((collection) => {
      Object.keys(collection).forEach((id) => ownedPlantIds.add(String(id)));
    });
  }

  const topPlantsRaw = props.metaDataModel.getTopPlants(50);
  const uniqueIds = new Set();
  const popularPlants = [];
  const targetCount = 10;

  for (const item of topPlantsRaw) {
    if (popularPlants.length >= targetCount) break;
    // checks if plants exist, is it already in our collections, 
    if (item.plant && !uniqueIds.has(item.plant.id)) {
      const plantIdString = String(item.plant.id);

      if (!ownedPlantIds.has(plantIdString)) {
        uniqueIds.add(item.plant.id);
        popularPlants.push(item.plant);
      }
    }
  }

  function handleQueryChangeACB(query) {
    props.model.setCurrentQuery(query);
  }

  function handleSearchACB() {
    props.model.doSearchByQuery();
  }

  function handleAddToCollection(collectionName, plant) {
    props.model.addPlant(plant, collectionName);
    props.metaDataModel.changeScore(plant, 1);
  }

  function handlePlantSelect(plant) {
    props.model.setCurrentPlant(plant);
  }

  return (
    <div>
      <SearchFormView
        query={currentQuery}
        validationError={validationError}
        onQueryChange={handleQueryChangeACB}
        doSearch={handleSearchACB}
      />
      {/* Is there an active search promise? */}
      {promiseState.promise ? (
        // Active Search (Loading, Error, or Results)
        promiseState.data && !promiseState.error ? (
          <SearchResultsView
            searchResults={promiseState.data}
            userCollections={userCollections}
            onPlantSelect={handlePlantSelect}
            onAddToCollection={handleAddToCollection}
          />
        ) : (
          <SuspenseView
            promise={promiseState.promise}
            error={promiseState.error}
          />
        )
      ) : (
        // Default State (No active search:  If we have popular plants loaded, show them. Otherwise will show the hint.
        <div className="default-search-state">
          {popularPlants.length > 0 ? (
            <>
              <h3 className="popular-search"> Trending Plants 🔥 </h3>
              <SearchResultsView
                searchResults={popularPlants}
                userCollections={userCollections}
                onPlantSelect={handlePlantSelect}
                onAddToCollection={handleAddToCollection}
              />
            </>
          ) : (
            <p className="search-hint">Search for plants to get started! 🌱</p>
          )}
        </div>
      )}
    </div>
  );
});
