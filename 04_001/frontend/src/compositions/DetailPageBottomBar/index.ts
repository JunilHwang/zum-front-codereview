import { Button } from "@src/components";
import { Component, createRouterInfo, Props, RouterLink } from "@src/core";
import { editPublisher, mainPublisher } from "@src/core/Store";
import { execFetch } from "@src/utils/functions";
import "./style.scss";

interface DetailPageBottomBarProps extends Props {
  dataId?: string;
}

class DetailPageBottomBar extends Component<{}, DetailPageBottomBarProps> {
  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="detail__page--bottombar" data-component-id=${componentId}></div>`;
  }

  protected setChildren(): void {
    const { props } = this;
    const routerInfo = createRouterInfo();
    const commonLinkProps = { isButton: true, routerInfo, publisherList: [mainPublisher, editPublisher] };
    const editId = props.dataId ? +props.dataId : -1;

    new RouterLink(".detail__page--bottombar", {
      ...commonLinkProps,
      href: `/edit`,
      text: "수정",
      callbackOption: {
        func: () => mainPublisher.setState({ ...mainPublisher.state, editId }),
        runPosition: "afterRenderPath",
      },
    });
    new Button(".detail__page--bottombar", { name: "delete", text: "삭제" });
    new RouterLink(".detail__page--bottombar", { ...commonLinkProps, href: `/`, text: "목록" });
  }

  protected setEvents(): void {
    this.registerDetailBottomBarClick();
  }

  // --------------------------------------------------

  // [1] 일반
  // ------

  // [2] Events
  private registerDetailBottomBarClick(): void {
    this.getEventTarget()?.addEventListener("click", (e) => this.handleDetailBottomBarClick(e));
  }

  private handleDetailBottomBarClick(e: MouseEvent | Event): void {
    const $target = e.target as HTMLElement;
    const isButton = $target.classList.contains("app-button") && $target instanceof HTMLButtonElement;
    if (!isButton) return;
    if ($target.name === "delete") {
      const isDelete = confirm("정말 삭제하시겠습니까?");
      if (!isDelete) return;
      this.requestDeleteData();
    }
  }
  // 서버로 전송 (게시글 삭제)
  private async requestDeleteData(): Promise<void> {
    try {
      const { dataId: id } = this.props;
      const options = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      };
      await execFetch({ type: "delete", options });
      editPublisher.setState({ ...editPublisher.state, isEdited: true });
      window.history.back();
    } catch (e) {
      console.error(e);
    }
  }

  // ------

  // [3] 전역 상태 변경 시 사용
  // ------
}
export default DetailPageBottomBar;
