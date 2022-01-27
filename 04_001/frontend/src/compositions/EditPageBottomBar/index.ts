import { PostData } from "@common/types";
import { Button } from "@src/components";
import { Component, createRouterInfo, RouterLink } from "@src/core";
import { editPublisher, mainPublisher, initEditState } from "@src/core/Store";
import { execFetch } from "@src/utils/functions";
import { requiredPostDataKeys } from "@src/utils/types";

import "./style.scss";

class EditPageBottomBar extends Component {
  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="edit__page--bottombar" data-component-id=${componentId}></div>`;
  }

  protected setChildren(): void {
    const routerInfo = createRouterInfo();
    const commonLinkProps = { isButton: true, routerInfo, publisherList: [mainPublisher, editPublisher] };

    new Button(".edit__page--bottombar", { name: "goback", text: "뒤로" });
    new RouterLink(".edit__page--bottombar", {
      ...commonLinkProps,
      href: `/`,
      name: "submitlink",
      text: "전송",
      callbackOption: { func: () => this.regsiterEditData(), runPosition: "beforePushState" },
    });
  }

  protected setEvents(): void {
    this.registerEditBottomBarClick();
  }

  // --------------------------------------------------

  // [1] 일반
  // ------

  // [2] Events
  private registerEditBottomBarClick(): void {
    this.getEventTarget()?.addEventListener("click", (e) => this.handleEditBottomBarClick(e));
  }

  private handleEditBottomBarClick(e: MouseEvent | Event): void {
    const $target = e.target as HTMLElement;
    const isButton = $target.classList.contains("app-button") && $target instanceof HTMLButtonElement;
    if (!isButton) return;
    if ($target.name === "goback") window.history.back();
  }

  // [2-1] Events (callback)
  /** RouterLink(submitlink)의 콜백, 현재 데이터를 전송 (작성 / 수정)  */
  private regsiterEditData(): boolean {
    const { editData } = editPublisher.state;
    const notEmptyCnt = Object.keys(editData).reduce((result, key) => {
      if (editData[key as keyof PostData]) result++;
      return result;
    }, 0);
    const isOK = notEmptyCnt >= requiredPostDataKeys.length;
    if (!isOK) return false;
    const isEdit = notEmptyCnt > requiredPostDataKeys.length;

    this.requestCreateData(editData, isEdit);
    editPublisher.setState({ ...editPublisher.state, editData: initEditState.editData });
    return isOK;
  }

  // 서버로 전송 (작성 or 수정)
  private async requestCreateData(editData: PostData, isEdit?: boolean): Promise<void> {
    try {
      const type = isEdit ? "edit" : "write";
      const method = isEdit ? "PUT" : "POST";
      const options = { method, body: JSON.stringify(editData), headers: { "Content-Type": "application/json" } };
      await execFetch({ type, options });
      editPublisher.setState({ ...editPublisher.state, isEdited: true });
    } catch (e) {
      console.error(e);
    }
  }
  // ------

  // [3] 전역 상태 변경 시 사용
  // ------
}
export default EditPageBottomBar;
