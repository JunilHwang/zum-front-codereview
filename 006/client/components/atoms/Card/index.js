// @ts-check
import Component from "../../../core/Component";

import star from "./star";
import "./style.scss";

/**
 * Card Class
 * - 단일 카드
 */
export default class Card extends Component {
  _template() {
    const {
      idx,
      url,
      title,
      imageUrl,
      summaryContent,
      mediaName,
    } = this._props;
    return `<div class="card" data-url="${url}" data-content-idx="${idx}">
      <div class="card-favor">${star}</div>
      <div class="card-img"><img class="lazy" data-imgsrc="${imageUrl}" alt="${title}"></img></div>
      <div class="card-title"><p>${title}</p></div>
      <div class="card-summary"><p>${summaryContent}</p></div>
      <div class="card-media"><p>by ${mediaName}</p></div>
    </div>`;
  }

  _render() {
    this._target.innerHTML += this._template();
    this._setAfterMounted();
  }
}
