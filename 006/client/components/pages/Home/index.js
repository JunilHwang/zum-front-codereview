// @ts-check
import Component from "../../../core/Component";
import { onHistoryChange } from "../../../core/Router";
import { selectorNameMap } from "../../../types";
import { selectOne } from "../../../utils";

import FooterOrganism from "../../organisms/Footer";
import HeaderOrganism from "../../organisms/Header";

import MainTemplate from "../../templates/Main";

import "./style.scss";

/**
 * HomePage Class
 */
export default class HomePage extends Component {
  _template() {
    return `<header></header><main></main><footer></footer>`;
  }

  _setAfterMounted() {
    const header = selectOne(selectorNameMap.header.name);
    const main = selectOne(selectorNameMap.main.name);
    const footer = selectOne(selectorNameMap.footer.name);

    new HeaderOrganism(header);
    new MainTemplate(main);
    new FooterOrganism(footer);

    onHistoryChange();
  }
}
