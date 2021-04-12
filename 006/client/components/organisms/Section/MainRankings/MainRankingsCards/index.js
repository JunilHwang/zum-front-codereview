// @ts-check
import Component from "../../../../../core/Component";
import { selectorNameMap } from "../../../../../types";
import { selectOne } from "../../../../../utils";

import RankCard from "../../../../atoms/RankCard";
import "./style.scss";

/**
 * MainRankingCards Class
 * - 카드 4개씩
 */
export default class MainRankingCards extends Component {
  _template() {
    return `<div class="main-section-cards"></div>`;
  }

  _setAfterMounted() {
    const cards = selectOne(selectorNameMap.main.cards, this._target);
    const { sessionKey, dataNums } = this._props;
    const cardObj = JSON.parse(sessionStorage.getItem(sessionKey));
    this._states["cards"] = Object.values(cardObj)
      .slice(0, dataNums)
      .sort((a, b) => a.rank - b.rank);

    this._states.cards.forEach((data) => {
      new RankCard(cards, { ...data });
    });
  }

  _render() {
    this._target.innerHTML += this._template();
    this._setAfterMounted();
  }
}
