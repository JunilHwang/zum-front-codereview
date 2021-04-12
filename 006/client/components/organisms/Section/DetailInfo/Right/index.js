// @ts-check
import Component from "../../../../../core/Component";

/**
 * DetailInfoRight Class
 * - 상세페이지 상단 정보 우측
 * - 태그
 */
export default class DetailInfoRight extends Component {
  _template() {
    const { tags } = this._props;
    let inner = "";
    for (const tag of tags) {
      inner += `<p class="detail-tag">${tag}</p>`;
    }
    return `<div class="detail-section-info-right"><div class="detail-tags-wrapper"><div>태그</div><div class="detail-tags">${inner}</div></div></div>`;
  }
  _render() {
    this._target.innerHTML += this._template();
  }
}
