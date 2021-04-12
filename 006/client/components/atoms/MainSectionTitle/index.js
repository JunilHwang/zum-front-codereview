// @ts-check
import Component from "../../../core/Component";

import "./style.scss";

/**
 * MainSectionTitle Class
 * - 섹션 타이틀
 */
export default class MainSectionTitle extends Component {
  _template() {
    const { path, title } = this._props;
    this._states.class = `title-${path}`;
    return `<div class="main-section-title ${this._states.class}" data-href="${path}">#${title}</div>`;
  }

  _render() {
    this._target.innerHTML += this._template();
  }
}
