// @ts-check
import Component from "../../../../core/Component";
import { selectOne } from "../../../../utils";
import MainSectionCards from "./MainCategoryCards";
import MainSectionTitle from "../../../atoms/MainSectionTitle";

import "./style.scss";

/**
 * FrontCategorySection Class
 * - 메인 템플릿인 경우
 *   - 섹션 타이틀
 *   - 카드 4개 표시
 * - 카테고리 템플릿인 경우
 *   - 카드만 초기 12개 표시
 */
export default class FrontCategorySection extends Component {
  _setUpComponent() {
    this._path = this._props.path;
    this._states.section = this._props.section;
  }

  _template() {
    return `<div class="${this._states.section}-section-category category-${this._path}"></div>`;
  }

  _setAfterMounted() {
    const selector = `.category-${this._path}`;
    const category = selectOne(selector, this._target);
    if (this._states.section === "main")
      new MainSectionTitle(category, { ...this._props });
    new MainSectionCards(category, { ...this._props });
  }

  _render() {
    this._target.innerHTML += this._template();
    this._setAfterMounted();
  }
}
