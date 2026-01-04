import { useState } from "react";
import { Button } from "/src/components/button.jsx";
import "/src/style/collection.css";

export function CollectionsPage(props) {
  const [collapsedState, setCollapsedState] = useState({});

  if (!props.isLoggedIn) {
    return (
      <div className="collections-page">
        <div className="login-prompt">
          <h2>Please log in to view your collections</h2>
        </div>
      </div>
    );
  }

  const collectionEntries = Object.entries(props.userCollections || {});

  function toggleCollection(name) {
    setCollapsedState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function getWateringStatus(days) {
    if (days === null) return null;

    if (days === 0) {
      return { text: "🏜️ Needs water today!", class: "status-urgent" };
    } else if (days <= 2) {
      return { text: `🕒💧 Water in ${days} days`, class: "status-soon" };
    } else {
      return { text: `🍀 Water in ${days} days`, class: "status-ok" };
    }
  }

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h2>My Collections</h2>
        <Button text="+ New Collection" onClick={props.onAddCollection} />
      </div>

      {collectionEntries.length === 0 ? (
        <div className="no-collections">
          <p>No collections yet. Create one to start adding plants! 🌱</p>
        </div>
      ) : (
        <div className="collections-list">
          {collectionEntries.map(([collectionName, plants]) => {
            const isCollapsed = collapsedState[collectionName];

            return (
              <div key={collectionName} className="collection-section">
                <div
                  className="collection-header clickable"
                  onClick={() => toggleCollection(collectionName)}
                >
                  <div className="collection-title-group">
                    <span
                      className={`collection-arrow ${isCollapsed ? "collapsed" : ""
                        }`}
                    >
                      ▼
                    </span>
                    <h3 className="collection-title">
                      {collectionName}
                      <span className="collection-count">
                        {Object.keys(plants).length} plants
                      </span>
                    </h3>
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      text="Delete"
                      onClick={() => props.onDeleteCollection(collectionName)}
                      size="small"
                      color="red"
                      outline={true}
                    />
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="collection-plants">
                    {Object.keys(plants).length === 0 ? (
                      <p className="empty-collection">
                        This collection is empty. Go to search to add plants!
                      </p>
                    ) : (
                      Object.entries(plants).map(([plantId, plant]) => {
                        const lastWatered = props.onGetLastWateredDate(
                          collectionName,
                          plantId
                        );
                        const daysLeft = props.onGetDaysUntilNextWatering(
                          collectionName,
                          plantId
                        );
                        const status = getWateringStatus(daysLeft);

                        return (
                          <div key={plantId} className="collection-plant-row">
                            <img
                              src={plant.img}
                              alt={plant.commonName}
                              className="c-plant-image"
                              onClick={() => props.onPlantClick(plant)}
                            />

                            <div
                              className="c-plant-info"
                              onClick={() => props.onPlantClick(plant)}
                            >
                              <h4 className="c-plant-name">
                                {plant.commonName}
                              </h4>
                              <p className="c-plant-latin">{plant.latinName}</p>
                              <div className="c-plant-meta">
                                <span className="c-tag">
                                  Quantity: {plant.quantity}
                                </span>
                                <span className="c-tag">
                                  Every {plant.wateringIntervalDays} days
                                </span>
                              </div>
                            </div>

                            <div className="c-plant-actions">
                              <div className="c-water-control">
                                <div className="c-date-wrapper">
                                  <label className="c-water-label">Last Watered:</label>
                                  <input
                                    type="date"
                                    className="c-date-input"
                                    value={lastWatered || ""}
                                    onChange={(e) => props.onWateredDateChange(collectionName, plantId, e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                {status && (
                                  <div className={`c-status-badge ${status.class}`} > {status.text} </div>
                                )}
                              </div>

                              <Button
                                text="Remove"
                                onClick={() => props.onRemovePlant(plantId, collectionName)}
                                size="small"
                                color="red"
                                outline={true}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}