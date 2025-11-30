import { SearchFormView } from "../views/searchFormView";
import { SuspenseView } from "../views/suspenseView";
import { observer } from "mobx-react-lite";

export const Search = observer(function SearchRender(props) {
  return <SearchFormView />;
});
