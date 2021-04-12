// @ts-check
import Component from "../../../core/Component";
import { onLinkClick, setTemplate } from "../../../core/Router";
import {
  apiNameMap,
  apiSubpathMap,
  apiUrlMap,
  attributeNameMap,
  baseFetchOptions,
  categoryTitleMap,
  eventTypes,
  pathNameMap,
  selectorNameMap,
  subCategoryTemplateMap,
  templateNameMap,
} from "../../../types";
import { getCardData, selectAll, selectOne } from "../../../utils";
import lazyLoading from "../../../utils/lazyLoading";
import FrontCategorySection from "../../organisms/Section/FrontCategory";
import RankingsSection from "../../organisms/Section/MainRankings";

import "./style.scss";

/**
 * MainTemplate Class
 */
export default class MainTemplate extends Component {
  _setUpComponent() {
    // 4개 카테고리, 랭킹 카드 저장할 배열 확보
    const categoryCardNums = 4;
    const rankingCardNums = 12;
    this._states = {
      category: {
        "/life": Array(categoryCardNums).fill(),
        "/food": Array(categoryCardNums).fill(),
        "/trip": Array(categoryCardNums).fill(),
        "/culture": Array(categoryCardNums).fill(),
      },
      ranking: Array(rankingCardNums).fill(),
      fetchTargetInfos: [
        { dataName: apiNameMap.categories, subpath: apiSubpathMap.life },
        { dataName: apiNameMap.categories, subpath: apiSubpathMap.food },
        { dataName: apiNameMap.categories, subpath: apiSubpathMap.trip },
        { dataName: apiNameMap.categories, subpath: apiSubpathMap.culture },
        { dataName: apiNameMap.ranking, subpath: "/" },
      ],
    };

    /**
     * @description
     * @description
     * @description
     * 제출 후 수정된 부분
     * - 이 fetch 부분이 `_setAfterMounted()` 에 있어서, MainCategoryCards, MainRankingCards 컴포넌트 생성 중 `sessionStorage.getItem` 메서드 에러 발생
     * - MainTemplate 컴포넌트 렌더링 이전에 fetch 호출하여 오류는 해결했으나,
     * - Observerble한 컴포넌트가 아니기 때문에 바로 UI가 변경되고 있지는 않는 상황, 다른 메뉴 눌렀다가 돌아오면 정상 작동 됨
     */
    const promises = this._states.fetchTargetInfos.map(
      ({ dataName, subpath }) => this._fetchData(dataName, subpath)
    );

    Promise.all(promises)
      .then(() => {
        console.log(`[Fetch] All Data Loaded: ${__filename}`);
      })
      .catch((e) => {
        console.error(e);
        // 요청 실패 UI
      });
  }

  _template() {
    return `<section id="main-template"></section>`;
  }

  /**
   * _fetchData
   * - async/await으로 데이터 요청
   * - sessionStorage에 데이터 저장
   * @param {apiNameMap} dataName 요청 api 첫번째 parameter
   * @param {string} subpath 나머지 parameter
   * @returns {Promise<boolean>} 요청 성공/실패
   */
  async _fetchData(dataName, subpath = "/") {
    try {
      const uri = apiUrlMap[dataName] + subpath;
      const categoryPromise = fetch(uri, baseFetchOptions);
      const response = await categoryPromise;
      const data = await response.text();

      sessionStorage.setItem(dataName + subpath, data);
      return true;
    } catch (e) {
      console.error("[ERROR] Fail to fetch Ranking data");
      console.error(e);
      return false;
    }
  }

  /**
   * @todo
   * - sessionStorage에서 카테고리별 4개, 랭킹 전부 가져와서 컴포넌트 생성
   * - 자식 컴포넌트 각 카테고리, 랭킹 organisms 추가
   * - 요청 중, 성공, 실패 각각 UI 생성
   */
  _setAfterMounted() {
    const section = selectOne(
      selectorNameMap.main.templateSection,
      this._target
    );

    this._states.fetchTargetInfos.forEach(({ dataName, subpath }) => {
      const isRanking = dataName === apiNameMap.ranking;
      const path = (isRanking ? dataName : subpath).replace("/", "");
      const title = categoryTitleMap[path];
      const sessionKey = dataName + subpath;
      const lastDataIdx = isRanking ? 12 : 4;
      const options = { section: "main", path, title, sessionKey, lastDataIdx };

      isRanking
        ? new RankingsSection(section, { ...options })
        : new FrontCategorySection(section, { ...options });
    });

    section.addEventListener(
      eventTypes.click,
      this.onComponentClick.bind(this)
    );

    const cardEles = selectAll(selectorNameMap.card.img);
    lazyLoading(cardEles);
  }

  /**
   * onComponentClick
   * 클릭 이벤트 위임 함수
   *
   * @param {Event} 이벤트 객체
   */
  onComponentClick({ target }) {
    if (!target) return;

    // 카테고리 제목 클릭시 템플릿 변경
    const templateHref = target.getAttribute(attributeNameMap.categoryHref);
    if (templateHref) {
      const templateName =
        subCategoryTemplateMap[templateHref] || subCategoryTemplateMap.root;
      setTemplate(templateName, { subpath: templateHref });
      onLinkClick("", templateName + "/" + templateHref, {});
      return;
    }

    // 카드 선택한 경우 상세페이지 이동
    const cardParent = target.closest("[data-url]");
    if (cardParent) {
      const { idx, title, media } = getCardData(cardParent);
      setTemplate(templateNameMap.detail, { idx, title, media });
      onLinkClick("", pathNameMap.detail + "/" + idx, {});
      return;
    }
    return;
  }
}
