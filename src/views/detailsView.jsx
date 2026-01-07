import { Button } from "/src/components/button.jsx";
import "/src/style/details.css";

export function DetailsView(props) {
  const plant = props.plant;

  if (!plant) return null;

  const imageUrl = plant.img || "https://placehold.co/400x300?text=No+Image";

  function getWateringStatus() {
    if (!props.isAdded) return null;
    if (props.daysUntilNextWatering === null) return null;

    if (props.daysUntilNextWatering === 0) {
      return { text: "🏜️ Needs water today!", color: "status-urgent" };
    } else if (props.daysUntilNextWatering <= 2) {
      return {
        text: `🕒💧 Water in ${props.daysUntilNextWatering} days`,
        color: "status-soon",
      };
    } else {
      return {
        text: `🍀 Water in ${props.daysUntilNextWatering} days`,
        color: "status-ok",
      };
    }
  }

  function renderCommentCB(commentObj) {
    return (
      <tr key={commentObj.id}>
        <td className="comment-text">{commentObj.comment}</td>
        <td className="comment-meta">
          <div>{commentObj.name || "User"}</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
            {new Date(commentObj.date).toLocaleDateString()}
          </div>
        </td>
      </tr>
    );
  }

  function handleRatingKeyDown(e) {
    if (e.key === "Enter") {
      props.addRatingACB();
    }
  }

  function handleCommentKeyDown(e) {
    if (e.key === "Enter") {
      props.addCommentACB();
    }
  }

  const wateringStatus = getWateringStatus();

  return (
    <div className="details-sidebar">
      <button className="details-close" onClick={props.onClose}>
        ×
      </button>

      {/* Image Container */}
      <div className="details-image-container">
        <img className="details-image" src={imageUrl} alt={plant.commonName} />
        {props.isAdded && (
          <span className="details-badge">In {props.collectionName}</span>
        )}
      </div>

      <div className="details-content">
        {/* Header */}
        <div className="details-header">
          <h2 className="details-title">{plant.commonName}</h2>
          <p className="details-latin">{plant.latinName}</p>
          {plant.family && (
            <p className="details-family">Family: {plant.family}</p>
          )}
        </div>

        {wateringStatus && (
          <div className={`details-alert ${wateringStatus.color}`}>
            {wateringStatus.text}
          </div>
        )}

        {/* Info Cards */}
        <div className="details-info">
          <div className="details-info-item">
            <span className="details-label">💧 Watering</span>
            <span className="details-value">{plant.watering || "Unknown"}</span>
            {plant.wateringIntervalDays && (
              <span className="details-subvalue">
                Every {plant.wateringIntervalDays} days
              </span>
            )}
          </div>

          <div className="details-info-item">
            <span className="details-label">Average rating</span>
            <span className="details-value rate-details">
              {props.avgRating ? (Math.round(props.avgRating * 10) / 10) : "—"} <span className="math-rate">/ 10</span>
            </span>
            <span className="details-subvalue">Based on {props.ratingsCount || 0} ratings</span>

            {/* Rating Input */}
            <div className="details-input-group">
              <input
                type="number"
                className="details-input"
                value={props.ratingValue}
                onChange={props.changeRatingValueACB}
                onKeyDown={handleRatingKeyDown}
                min="1"
                max="10"
                placeholder="1-10"
              />
              <Button onClick={props.addRatingACB} text="Rate" size="small" color="green" outline={true} />
            </div>
          </div>

          <div className="details-info-item">
            <span className="details-label">Comments</span>
            {props.comments.length > 0 ? (
              <table className="comments-table">
                <tbody>
                  {props.comments.map(renderCommentCB)}
                </tbody>
              </table>
            ) : (
              <p className="no-comments">No comments yet. Be the first!</p>
            )}

            {/* Comment Input */}
            <div className="details-input-group">
              <input
                type="text"
                className="details-input"
                value={props.commentText}
                onChange={props.changeCommentTextACB}
                onKeyDown={handleCommentKeyDown}
                placeholder="Share your experience..."
              />
              <Button onClick={props.addCommentACB} text="Post" size="small" color="green" outline={true} />
            </div>
          </div>

          <div className="details-info-item">
            <span className="details-label">☀️ Light</span>
            <span className="details-value">{props.sunConditions}</span>
          </div>

          {plant.lightIdeal && (
            <div className="details-info-item">
              <span className="details-label">✨ Ideal Light</span>
              <span className="details-value">{plant.lightIdeal}</span>
            </div>
          )}

          {props.pruningInfo && (
            <div className="details-info-item">
              <span className="details-label">🍃 Pruning</span>
              <span className="details-value">{props.pruningInfo}</span>
            </div>
          )}
        </div>

        {/* Collection Stats */}
        {props.isAdded && (
          <div className="details-collection-info">
            <h4>My Collection Stats</h4>
            <div className="details-info">
              <div className="details-info-item" style={{ background: 'white' }}>
                <span className="details-label">🌲 Quantity</span>
                <span className="details-value">
                  {props.quantity} plant{props.quantity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="details-info-item" style={{ background: 'white' }}>
                <span className="details-label">💦 Last Watered</span>
                <span className="details-value">{props.lastWateredDate || "Never"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="details-actions">
          {props.isLoggedIn ? (
            props.isAdded ? (
              <Button
                text="✓ Added to Collection"
                color="dark"
                outline={true}
                disabled={true}
                fullWidth={true}
              />
            ) : (
              <Button
                text="Add to Collection 🌿"
                onClick={props.onAddToCollection}
                color="green"
                fullWidth={true}
              />
            )
          ) : (
            <Button
              text="Log in to add plants"
              onClick={() => (window.location.hash = "#/login")}
              color="light"
              outline={true}
              fullWidth={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}