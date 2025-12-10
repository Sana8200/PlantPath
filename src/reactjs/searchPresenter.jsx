import { SearchFormView } from "../views/searchFormView";
import { SearchResultsView } from "../views/SearchResultsView";
import { SuspenseView } from "../views/suspenseView";
import { observer } from "mobx-react-lite";

export const Search = observer(function SearchRender({ model }) {
  return (
    <div>
      <SearchFormView
        onSearch={(query) => model.setSearchQuery(query)}
      />
      <SearchResultsView
        searchResults={model.searchResults}
        onPlantSelect={(plant) => model.setCurrentPlant(plant)}
      />
    </div>
  );
});
