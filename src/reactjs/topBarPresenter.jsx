import { observer } from "mobx-react-lite";
import { TopBar } from "../views/topBarView";

export const topBar = observer(function topBarRender(props) {
  return <TopBar />;
});
