import { UserPage } from "../views/userView";
import { observer } from "mobx-react-lite";

export const User = observer(function UserRender(props) {
  return <UserPage user={props.model.user} />;
});