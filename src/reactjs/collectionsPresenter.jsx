import { CollectionsPage } from "../views/collectionsView";
import { observer } from "mobx-react-lite";

export const Collections = observer(function CollectionsRender(props) {
  return (
    <div>
      <CollectionsPage />
    </div>
  );
});
