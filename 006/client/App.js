// @ts-check
import Component from "./core/Component";

import Home from "./components/pages/Home";

import "./App.scss";
import { templateNameMap } from "./types";
import { getCurrentPathObj } from "./core/Router";

/**
 * App Component
 */
export default class App extends Component {
  _setUpComponent() {
    /**
     * @todo App에서 상태관리할 것? 전역상태 관리 툴과의 관계?
     */
  }

  _setAfterMounted() {
    const { template } = getCurrentPathObj();

    if (template === templateNameMap.root) {
      const appDiv = this._target;
      new Home(appDiv);
    }
  }
}
