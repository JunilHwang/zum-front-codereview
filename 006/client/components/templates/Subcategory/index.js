// @ts-check
import Component from "../../../core/Component";
import { onLinkClick, setTemplate } from "../../../core/Router";
import {
  apiUrlMap,
  baseFetchOptions,
  categoryTitleMap,
  eventTypes,
  pathNameMap,
  selectorNameMap,
  templateNameMap,
} from "../../../types";
import { getCardData, selectAll, selectOne } from "../../../utils";
import lazyLoading from "../../../utils/lazyLoading";
import FrontCategorySection from "../../organisms/Section/FrontCategory";

import "./style.scss";

/**
 * SubCategoryTemplate Component
 */
export default class SubCategoryTemplate extends Component {
  _setUpComponent() {
    this._states.imgIds = new Set();
  }

  _template() {
    return `<section id="category-section"></section>`;
  }

  _setEvent() {
    this._target.addEventListener(
      eventTypes.click,
      this._onCardsClick.bind(this)
    );
  }

  _setAfterMounted() {
    const section = selectOne("#category-section", this._target);
    const path = this._props.subpath;
    const title = categoryTitleMap[path];
    const sessionKey = pathNameMap.category[path];
    const startDataIdx = 0;
    const lastDataIdx = 12;
    const options = {
      section: "category",
      path,
      title,
      sessionKey,
      startDataIdx,
      lastDataIdx,
    };
    new FrontCategorySection(section, { ...options });

    const cardEles = selectAll(selectorNameMap.card.img);
    lazyLoading(cardEles);
  }

  /**
   * @todo
   * sessionData 모두 호출한 경우
   * - 추가 크롤링?
   */
  async _fetchData() {
    try {
      const url = apiUrlMap.category + "/" + this._props.subpath;
      const promise = fetch(url, baseFetchOptions);
      const response = await promise;
      const data = await response.json();
      return data;
    } catch (e) {
      // TODO
      console.log(e);
      return false;
    }
  }

  /**
   *
   * @param {Event} param0 이벤트 객체 중 target만
   */
  _onCardsClick({ target }) {
    // 카드 선택한 경우 상세페이지 이동
    const cardParent = target.closest("[data-url]");
    if (cardParent) {
      const { idx, title, media } = getCardData(cardParent);
      setTemplate(templateNameMap.detail, { idx, title, media });
      onLinkClick("", pathNameMap.detail + "/" + idx, {});
      return;
    }
  }
}
