import { Board, Pagination } from "@src/components";
import { Component } from "@src/core";
import { mainPublisher, MainFilterOptions, initMainState, createPostData, editPublisher } from "@src/core/Store";
import { getAllPostData } from "@src/utils/functions";

import "./style.scss";

interface MainPageBoardState {
  isUpdate: boolean;
}

class MainPageBoard extends Component<MainPageBoardState> {
  protected init(): void {
    this.initGetAllPostData();
    this.setState({ ...this.state, isUpdate: false }, { noRender: true });
  }

  protected initSubscriber(): void {
    // main
    this.registerSubscriberFunction(mainPublisher, () => {
      const { currKeys } = mainPublisher.recentChangedKeys;
      if (currKeys.includes("isInit")) return this.execInitMainPageBoard();
      if (currKeys.includes("filterOptions") || currKeys.includes("postData") || currKeys.includes("isRefresh"))
        this.execUpdateMainPageBoard(currKeys.includes("isRefresh"));
    });
  }

  protected setBeforeRender(): void {
    if (!this.state) return;
    if (this.state.isUpdate) this.setState({ ...this.state, isUpdate: false }, { noRender: true });
  }

  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="main__page--board" data-component-id=${componentId}></div>`;
  }

  protected setChildren(): void {
    const { filterOptions, postData } = mainPublisher.state;
    const { pageNum, numPost } = filterOptions;

    // 👇 여기서만 filterOptions에 따른 데이터 적용(Board 컴포넌트에만 적용)
    const arrPostData = createPostData({ filterOptions, postData });
    new Board(".main__page--board", { arrPostData });

    // 👇 여기서는 필터링되어 잘라낸 데이터가 아닌 필터링 된 전체 데이터 갯수를 기준으로 해야함!
    const pageOnlyPostData = createPostData({ filterOptions, postData, isFullData: true });
    const max = Math.ceil(pageOnlyPostData.length / numPost);
    new Pagination(".main__page--board", { pageNum, max });
  }

  protected setEvents(): void {
    this.registerMainBoardClick();
  }

  // --------------------------------------------------

  // [1] 일반
  /** 👾 initGetAllPostData: 서버에서 모든 게시물 데이터를 가져와서 mainPublisher 업데이트
   * - 초기 렌더링에는 무조건 실행하지만, 작성 & 수정때는 mainPublisher에 등록된 함수들은 실행되면 안됨.
   */
  private async initGetAllPostData() {
    const latestPostdata = await getAllPostData();
    if (!latestPostdata) return;
    const { isEdited } = editPublisher.state;

    initMainState.postData = latestPostdata;
    mainPublisher.setState(
      { ...mainPublisher.state, postData: [...latestPostdata] },
      { notExec: isEdited ? true : undefined }
    );
    if (isEdited) editPublisher.setState({ ...editPublisher.state, isEdited: false }, { notExec: true });
  }

  // ------

  // [2] Events
  private registerMainBoardClick(): void {
    this.getEventTarget()?.addEventListener("click", (e) => this.handleMainBoardClick(e));
  }
  private handleMainBoardClick(e: MouseEvent | Event): void {
    const $target = e.target as HTMLElement;
    const isRouterLink = $target.nodeName === "A" && $target.classList.contains("app-link");
    if (isRouterLink) return;

    const $board = $target.closest(".app-board");
    const $pagination = $target.closest(".app-pagination");
    if (!$board && !$pagination) return;
    if ($board) {
      const $tr = $target.closest("tr");
      if (!$tr) return;

      const isCreatedDate = $target.nodeName === "TH" && $target.classList.contains("createdDate");
      const isAuthor = $target.nodeName === "TD" && $target.classList.contains("author") && $target.textContent;
      if (isCreatedDate) return this.execCreatedDateClick();
      if (isAuthor && $target.textContent) return this.execAuthorClick($target.textContent);
    } else {
      const isItem = $target.nodeName === "LI";
      if (isItem) return this.execPaginationItemClick($target as HTMLLIElement);
    }
  }

  /** 게시판 Item 클릭 - 작성일 정렬 */
  private execCreatedDateClick(): void {
    const { filterOptions: prevFilterOptions } = mainPublisher.state;
    const isDesc = !prevFilterOptions.isDesc; // 항상 이전 값과 반대로

    const filterOptions = { ...prevFilterOptions, isDesc };

    mainPublisher.setState({ ...mainPublisher.state, filterOptions });
    this.setState({ ...this.state, isUpdate: true }, { isSetEvents: false });
  }

  private execAuthorClick(author: string): void {
    const { filterOptions: prevFilterOptions } = mainPublisher.state;
    const filterOptions = { ...prevFilterOptions, author };

    mainPublisher.setState({ ...mainPublisher.state, filterOptions });
    this.setState({ ...this.state, isUpdate: true }, { isSetEvents: false });
  }

  /** 페이지네이션 Item 클릭 */
  private execPaginationItemClick($li: HTMLLIElement): void {
    const isPrevNext = $li.classList.contains("prev") || $li.classList.contains("next");
    const { filterOptions: prevFilterOptions, postData } = mainPublisher.state;
    let pageNum: number = -1;

    if (isPrevNext) {
      if (!this.state || $li.classList.contains("disabled")) return;
      const { pageNum: prevNum, numPost } = prevFilterOptions;
      const max = Math.ceil(postData.length / numPost);

      const isPrev = $li.classList.contains("prev");
      pageNum = isPrev ? prevNum - 5 : prevNum + 5;
      if (pageNum > max) pageNum = max;
      else if (pageNum <= 0) pageNum = 1;
    } else {
      const tmpPageNum = +`${$li.textContent}`;
      if (Number.isNaN(tmpPageNum)) return;
      pageNum = tmpPageNum;
    }
    const filterOptions: MainFilterOptions = { ...prevFilterOptions, pageNum };

    mainPublisher.setState({ ...mainPublisher.state, filterOptions }, { notExec: true });
    this.setState({ ...this.state, isUpdate: true }, { isSetEvents: false });
  }

  // ------

  // [3] 전역 상태 변경 시 사용
  /** 게시물 초기화 (MainPageTopBar의 '초기화'버튼이 클릭되었을 때 작동) */
  private execInitMainPageBoard(): void {
    mainPublisher.setState({ ...mainPublisher.state, ...initMainState, isInit: false }, { notExec: true });
    this.setState({ ...this.state, isUpdate: true }, { isSetEvents: false });
  }

  /** 게시물 업데이트 (새로고침 버튼 클릭 시 작동) */
  private execUpdateMainPageBoard(isRefresh?: boolean): void {
    if (isRefresh) mainPublisher.setState({ ...mainPublisher.state, isRefresh: false }, { notExec: true });
    return this.setState({ ...this.state, isUpdate: true }, { isSetEvents: false });
  }
}
export default MainPageBoard;
