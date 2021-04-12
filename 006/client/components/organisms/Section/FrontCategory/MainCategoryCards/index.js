// @ts-check
import Component from "../../../../../core/Component";
import { selectorNameMap } from "../../../../../types";
import { selectOne } from "../../../../../utils";

import Card from "../../../../atoms/Card";
import "./style.scss";

/**
 * MainSectionCards Class
 * - 카드 4개씩
 */
export default class MainSectionCards extends Component {
  _template() {
    return `<div class="main-section-cards"></div>`;
  }

  _setAfterMounted() {
    const cards = selectOne(selectorNameMap.main.cards, this._target);
    const { sessionKey, startDataIdx, lastDataIdx } = this._props;
    const cardObj = JSON.parse(sessionStorage.getItem(sessionKey));
    this._states["cards"] = Object.values(cardObj).slice(
      startDataIdx || 0,
      lastDataIdx
    );

    this._states.cards.forEach((data) => {
      new Card(cards, { ...data });
    });
  }

  _render() {
    this._target.innerHTML += this._template();
    this._setAfterMounted();
  }
}
