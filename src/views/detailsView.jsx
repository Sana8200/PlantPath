import { Button } from "/src/components/button.jsx";
import "/src/style/details.css";

export function DetailsView(props) {
  if (!props.plant) return null;

  return (
    <div className="details-sidebar">
      <button className="details-close" onClick={props.onClose}>×</button>

      <img
        className="details-image"
        src={props.plant.Img || "https://placehold.co/300x200?text=No+Image"}
        alt="Plant"
      />

      <h2 className="details-title">
        {props.plant["Common name (fr.)"] || "Unknown Plant"}
      </h2>

      <p className="details-latin">{props.plant["Latin name"] || ""}</p>

      <div className="details-actions">
        <Button
          text="Add to Collection 🌿"
          onClick={props.onAddToCollection}
          fullWidth
        />
      </div>
    </div>
  );
}