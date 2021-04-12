// @ts-check
import Component from "../../../core/Component";

import "./style.scss";

/**
 * RankCard Class
 * - 메인 페이지 랭킹 카드
 */
export default class RankCard extends Component {
  _template() {
    const { idx, url, title, rank, mediaName } = this._props;
    return `<div class="rank-card" data-url="${url}" data-content-idx="${idx}">
      <div class="rank-card-left">
        <div class="rank-card-rank"><p>${rank}</p></div>
      </div>
      <div class="rank-card-right">
        <div class="rank-card-title"><p>${title}</p></div>
        <div class="rank-card-media"><p>by ${mediaName}</p></div>
      </div>
    </div>`;
  }

  _render() {
    this._target.innerHTML += this._template();
  }
}
