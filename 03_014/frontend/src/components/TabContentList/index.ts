import { Component } from "@src/core";
import { $, $All } from "@src/utils/funcs";
import { FetchDataType, HubContent } from "@src/utils/types";
import { TabContentItem } from "..";
import "./style.scss";

type TabContentListProps = {
  listIdx?: number;
  subject: string;
  resData?: FetchDataType<HubContent> | null;
  pageType: "home" | "sub" | "favorite";
};

class TabContentList extends Component {
  setBeforeStarted(): void {
    const { pageType } = this.props as TabContentListProps;
    pageType === "home" && (this.options.keepAdding = true);
  }

  setTemplate(): string {
    const { listIdx, subject } = this.props as TabContentListProps;
    const listIdxClassName = `list${listIdx}`;

    return `
    <div class="tab__content__list">
      <p class="tab__content__list--subject">#${subject}</p>
      <ul class="tab__content__list--innerlist ${listIdxClassName}"></ul>
    </div>
    `;
  }

  setInitState() {
    const { pageType } = this.props as TabContentListProps;
    if (pageType === "home") return {};
    return {
      start: 0,
      end: 12,
      last: Number.MAX_SAFE_INTEGER,
      unit: 12,
      ioObserver: null,
    };
  }

  setRenderChildren(): void {
    const { pageType } = this.props as TabContentListProps;
    switch (pageType) {
      case "home":
        return this.setRenderChildrenForHomePage();
      case "sub":
      case "favorite":
        return this.setRenderChildrenForSubPage();
      default:
        break;
    }
  }

  /** TabContentList : RenderChildren - 메인 페이지 (Home) */
  setRenderChildrenForHomePage(): void {
    const { resData, listIdx } = this.props as TabContentListProps;
    const listIdxClassName = `list${listIdx}`;

    const $lists = Array.from($All(".tab__content__list--innerlist"));
    if (!$lists.length) return;
    const $thisList = $lists.find(($list) => $list.classList.contains(listIdxClassName));
    if (!$thisList) return;

    if (!resData) return;
    const hubContents = resData.data as HubContent[];
    if (!hubContents) return;

    hubContents.slice(0, 4).forEach((data) => new TabContentItem($thisList, { data }));
  }

  /** TabContentList : RenderChildren - 서브 페이지 (라이프 / 푸드 / 여행 / 컬쳐)
   * IntersectionObserver 활용 (무한 스크롤)
   */
  setRenderChildrenForSubPage(): void {
    const { resData } = this.props as TabContentListProps;
    const $list = $(".tab__content__list--innerlist");
    if (!$list || !resData) return;

    const hubContents = resData.data as HubContent[];
    if (!hubContents) return;
    if (this.state.last !== hubContents.length) this.setState({ last: hubContents.length }, { notUsedRender: true });
    if (!this.state.ioObserver) this.state.ioObserver = this.setIntersectionObserver();

    const { start, end } = this.state;
    if (start <= -1 || !end) return;
    hubContents.slice(start, end).forEach((data) => new TabContentItem($list, { data }));
    this.checkObserveItems(this.state.ioObserver);
  }

  setIntersectionObserver(): IntersectionObserver {
    const observerOption: IntersectionObserverInit = { threshold: 0.7 };

    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const { start: prevStart, end: prevEnd, unit, last } = this.state;
        if (entry.isIntersecting) {
          const MS = 300;
          setTimeout(() => {
            const start = prevStart + unit;
            const end = prevEnd + unit > last ? last : prevEnd + unit;

            const stateOptions = {
              notUsedRender: true,
              customFunc: () => this.setRenderChildren(),
            };

            this.setState({ start, end }, stateOptions);
            observer.unobserve(entry.target);
            this.checkObserveItems(observer);
          }, MS);
        }
      });
    }, observerOption);
  }

  checkObserveItems(observer: IntersectionObserver): void {
    const listChildren = document.querySelectorAll(".tab__content__list--innerlist li");
    const { start, last } = this.state;
    listChildren.forEach((el) => {
      if (!el.nextElementSibling && start < last) observer.observe(el);
      else if (start >= last) observer.disconnect();
    });
  }
  // ------------
}

export type { TabContentListProps };
export default TabContentList;
