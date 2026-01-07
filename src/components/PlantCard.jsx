import "/src/style/plantCard.css";

export function PlantCard({
  plant,
  lastWateredDate = null,
  showSetWateredDate = false,
  onWateredDateChangeFunction = null,
  showAddToCollection = false,
  userCollections = null,
  onAddToCollectionFunction = null,
  showQuantity = false,
  daysUntilNextWatering = null,
  showSunDetails = false,
  showWatering = false,
}) {
  function handleWateredDateChange(event) {
    if (onWateredDateChangeFunction) {
      onWateredDateChangeFunction(event.target.value);
    }
  }

  function handleSelectChangeACB(event) {
    const collectionName = event.target.value;
    event.target.value = "default"; // Reset dropdown visual state

    if (onAddToCollectionFunction) {
      onAddToCollectionFunction(collectionName, plant);
    }
  }

  function renderOptionCollectionNameACB(collectionName) {
    return <option key={collectionName} value={collectionName}>{collectionName}</option>;
  }

  return (
    <div className="plant-card-content">
      {/* Image Section */}
      <div className="plant-card-img-wrapper">
        <img
          src={plant.img || "https://placehold.co/400x300?text=No+Image"}
          alt={plant.commonName}
          loading="lazy"
        />
      </div>

      {/* Body Section */}
      <div className="plant-card-body">
        <div className="plant-header">
          <h3 className="plant-title">{plant.commonName}</h3>
          <p className="plant-latin">{plant.latinName}</p>
        </div>

        {/* Details Section */}
        <div className="plant-details-preview">
          {showWatering && plant.watering && (
            <p className="plant-detail-text" title={plant.watering}>
              💧 {plant.watering}
            </p>
          )}
          {showSunDetails && plant.sunConditions && (
            <p className="plant-detail-text" title={plant.sunConditions}>
              ☀️ {plant.sunConditions}
            </p>
          )}
        </div>

        {/* Add to Collection - STOP PROPAGATION */}
        {showAddToCollection && userCollections && (
          <div
            className="plant-action-area"
            onClick={(e) => e.stopPropagation()} // Prevents card click
          >
            <select
              className="add-to-collection-select"
              defaultValue="default"
              onChange={handleSelectChangeACB}
            >
              <option value="default" disabled>＋ Add to collection</option>
              {Object.keys(userCollections).map(renderOptionCollectionNameACB)}
            </select>
          </div>
        )}

        {/* Watering Date Picker */}
        {showSetWateredDate && (
          <div className="plant-action-area" onClick={(e) => e.stopPropagation()}>
            <label className="input-label">Last Watered:</label>
            <input
              type="date"
              className="plant-date-input"
              value={lastWateredDate || ""}
              onChange={handleWateredDateChange}
            />
            {daysUntilNextWatering !== null && (
              <p className="watering-status-text">
                {daysUntilNextWatering <= 0 ? "Water today!" : `${daysUntilNextWatering} days left`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}