// @ts-check
import Component from "../../../../core/Component";
import { selectorNameMap } from "../../../../types";
import { selectOne } from "../../../../utils";
import MainSectionTitle from "../../../atoms/MainSectionTitle";
import MainRankingsCards from "./MainRankingsCards";

import "./style.scss";

/**
 * RankingsSection Class
 */
export default class RankingsSection extends Component {
  _template() {
    return `<div class="main-section-ranking"></div>`;
  }

  _setAfterMounted() {
    const selector = selectorNameMap.main.ranking;
    const ranking = selectOne(selector, this._target);
    new MainSectionTitle(ranking, { title: "실시간 랭킹 12" });
    new MainRankingsCards(ranking, { ...this._props });
  }

  _render() {
    this._target.innerHTML += this._template();
    this._setAfterMounted();
  }
}
