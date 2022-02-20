import * as styles from "../public/css/style.scss";
import App from "./App";
import { EventManager } from "./core/eventManager";
import { Giact } from "./core/giact";

styles;

Giact.render(App, document.getElementById("root"));

EventManager.regist();
