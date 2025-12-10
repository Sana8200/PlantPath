import { StartView } from "../views/startView";
import { observer } from "mobx-react-lite";

export const Start = observer(function StartRender(props) {
  
  function handleStart() {
    window.location.hash = "#/login";
  }

  return <StartView onStartClick={handleStart} />;
});