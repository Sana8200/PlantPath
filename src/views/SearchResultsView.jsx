export function SearchResultsView(props) {
  function renderPlantCB(plant) {
    return (
      <div
        key={plant}
        style={{ border: "1px solid black", margin: 10, padding: 10 }}
      >
        <div>{plant["Common name (fr.)"]}</div>
        <img
          src={plant.Img}
          height={100}
        />
        <div>
          <strong>Sun instructions:</strong>
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

  return <div>{(props.searchResults || []).map(renderPlantCB)}</div>;
}
