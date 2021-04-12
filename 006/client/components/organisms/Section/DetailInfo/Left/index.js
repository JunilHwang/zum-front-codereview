// @ts-check
import Component from "../../../../../core/Component";

/**
 * DetailInfoLeft Class
 * - 상세페이지 상단 정보 좌측
 * - 게시일, 원본링크
 */
export default class DetailInfoLeft extends Component {
  _template() {
    const { media, updated, originUrl } = this._props;
    return `<div class="detail-section-info-left"><p>${media}</p><p>업데이트: ${updated}</p><p><a href="${originUrl}">원문 보러가기</a></p></div>`;
  }
  _render() {
    this._target.innerHTML += this._template();
  }
}
