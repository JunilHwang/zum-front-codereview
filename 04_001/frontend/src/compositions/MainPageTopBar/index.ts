import { Button, Input, SelectBox } from "@src/components";
import { Component, createRouterInfo, RouterLink } from "@src/core";
import { mainPublisher, initMainState, MainFilterOptions, editPublisher, initEditState } from "@src/core/Store";
import { getAllPostData } from "@src/utils/functions";
import "./style.scss";

class MainPageTopBar extends Component {
  protected setTemplate(): string {
    const { componentId } = this;
    return `
    <div class="main__page--topbar" data-component-id=${componentId}>
      <div class="topbar--box"></div>
      <div class="topbar--box"></div>
    </div>`;
  }
  protected setChildren(): void {
    const routerInfo = createRouterInfo();
    const { numPostList, filterOptions } = mainPublisher.state;
    const { searchWord, numPost } = filterOptions;

    const createSelector = (idx: number) => `.main__page--topbar .topbar--box:nth-child(${idx})`;
    new Button(createSelector(1), { name: "refrash", text: "새로고침" });
    new Button(createSelector(1), { name: "init", text: "초기화" });
    new RouterLink(createSelector(1), {
      href: "/write",
      text: "작성",
      routerInfo,
      isButton: true,
      publisherList: [mainPublisher, editPublisher],
      callbackOption: {
        func: () => editPublisher.setState({ ...initEditState }),
        runPosition: "beforePushState",
      },
    });
    new Input(createSelector(2), {
      name: "search_input",
      type: "text",
      placeholder: "검색어를 입력해주세요.",
      value: searchWord,
    });
    new SelectBox(createSelector(2), { numPostList, selectedValue: numPost });
  }

  protected setEvents(): void {
    this.registerMainTopBarClick();
    this.registerMainTopBarKeyUp();
    this.registerMainTopBarChange();
  }

  // --------------------------------------------------

  // [1] Events
  private registerMainTopBarClick(): void {
    this.getEventTarget()?.addEventListener("click", (e) => this.handleMainTopBarClick(e));
  }

  private handleMainTopBarClick(e: MouseEvent | Event): void {
    const $target = e.target as HTMLElement;
    const $closestTarget = $target.closest(".topbar--box");
    if (!$closestTarget) return;

    const isButton = $target.classList.contains("app-button") && $target instanceof HTMLButtonElement;
    if (isButton) {
      const buttonName = $target.name;
      if (buttonName === "init") this.initMainTopBarElements();
      else if (buttonName === "refrash") this.refrashPostData();
    }
  }
  // 초기화
  private initMainTopBarElements(): void {
    const strInputSelector = `.topbar--box:nth-child(2) input[name="search_input"]`;
    const $searchInput = this.getEventTarget()?.querySelector(strInputSelector);
    $searchInput && (($searchInput as HTMLInputElement).value = "");

    const { filterOptions } = initMainState;
    const strSelectBoxSelector = `.topbar--box:nth-child(2) .app-selectbox`;
    const $selectbox = this.getEventTarget()?.querySelector(strSelectBoxSelector);
    $selectbox && (($selectbox as HTMLSelectElement).value = `${filterOptions.numPost}`);

    mainPublisher.setState({ ...initMainState, isInit: true });
  }
  // 새로고침
  private async refrashPostData(): Promise<void> {
    try {
      const latestPostdata = await getAllPostData();
      if (!latestPostdata) return;
      initMainState.postData = latestPostdata;
      mainPublisher.setState({ ...mainPublisher.state, postData: [...latestPostdata], isRefresh: true });
    } catch (e) {
      console.error(e);
    }
  }
  // ~~~

  private registerMainTopBarKeyUp(): void {
    this.getEventTarget()?.addEventListener("keyup", (e) => this.handleMainTopBarKeyUp(e));
  }

  private handleMainTopBarKeyUp(e: KeyboardEvent | Event): void {
    const $target = e.target as HTMLInputElement;
    const isSearchInput = $target.name === "search_input" && $target.nodeName === "INPUT";
    if (!isSearchInput) return;

    const searchWord = $target.value;
    const { filterOptions: prevFilterOptions } = mainPublisher.state;
    const filterOptions: MainFilterOptions = { ...prevFilterOptions, searchWord };

    mainPublisher.setState({ ...mainPublisher.state, filterOptions });
  }
  // ~~~

  private registerMainTopBarChange(): void {
    this.getEventTarget()?.addEventListener("change", (e) => this.handleMainTopBarChange(e));
  }
  private handleMainTopBarChange(e: Event): void {
    const $target = e.target as Element;
    if (!$target) return;
    const isSelectBox = $target.nodeName === "SELECT" && $target.classList.contains("app-selectbox");
    if (!isSelectBox) return;
    const $select = $target as HTMLSelectElement;

    const numPost = +$select.value;
    if (Number.isNaN(numPost)) return;

    const { filterOptions: prevFilterOptions } = mainPublisher.state;
    mainPublisher.setState({ ...mainPublisher.state, filterOptions: { ...prevFilterOptions, numPost } });
  }
  // ------
}
export default MainPageTopBar;
