// TODO make a reactive model (application state), pass it as prop to the components used
import { ReactRoot } from "./ReactRoot";
import { createRoot } from "react-dom/client";

const mountedApp = createRoot(document.getElementById("root"));
mountedApp.render(<ReactRoot />);
