// @ts-check
import Component from "../../../../core/Component";
import { selectOne } from "../../../../utils";
import DetailInfoLeft from "./Left";
import DetailInfoRight from "./Right";

import "./style.scss";

/**
 * DetailInfoOrganism Class
 */
export default class DetailInfoOrganism extends Component {
  _template() {
    const { title } = this._props;
    return `<div class="detail-section-info">
    <p class="detail-section-info-title">${title}</p><hr />
    <div class="detail-section-info-bottom"></div>
    </div>`;
  }

  _setAfterMounted() {
    const { updated, originUrl, tags, media } = this._props;
    const infos = selectOne(".detail-section-info-bottom", this._target);
    new DetailInfoLeft(infos, { media, updated, originUrl });
    new DetailInfoRight(infos, { tags });
  }

  _render() {
    this._target.innerHTML = this._template();
    this._setAfterMounted();
  }
}
