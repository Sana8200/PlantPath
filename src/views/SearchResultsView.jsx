import "/src/style/searchResults.css";

export function SearchResultsView(props) {

  function handlePlantClick(plant) {
    props.onPlantSelect(plant);
  }

  function renderPlantCB(plant) {
    return (
      <div
        key={plant}
        className="plant-card"
        onClick={() => handlePlantClick(plant)}
      >
        <div className="plant-card-name">{plant["Common name (fr.)"]}</div>
        <img className="plant-card-image"
          src={plant.Img}
          height={100}
        />
        <div className="plant-card-info">
          <strong className="plant-card-light">Sun instructions:</strong>
          {plant["Light ideal"]}
        </div>
        <select>
          <option>Choose where to add plant</option>
          <option>{"Add to favorites <3"}</option>
          <option>{"Add to my collection 1 🌿"}</option>
          <option>{"Add to my collection 2 🌿"}</option>
        </select>
      </div>
    );
  }

  return <div className="search-results-grid">{(props.searchResults || []).map(renderPlantCB)}</div>;
}


