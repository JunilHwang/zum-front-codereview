import { EditPageBottomBar, EditPageContent } from "@src/compositions";
import { Component } from "@src/core";
import { editPublisher, mainPublisher, initMainState } from "@src/core/Store";

class EditPage extends Component {
  protected initSubscriber(): void {
    this.registerSubscriberFunction(mainPublisher, () => {
      const { currKeys } = mainPublisher.recentChangedKeys;
      if (currKeys.includes("editId")) this.registerEditData();
    });
  }
  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="edit__page default-page-size" data-component-id=${componentId}></div>`;
  }

  protected setChildren(): void {
    const { editData } = editPublisher.state;
    new EditPageContent(".edit__page", { editData });
    new EditPageBottomBar(".edit__page");
  }

  // --------------------------------------------------

  // [1] 일반
  // ------

  // [2] Events
  // ------

  // [3] 전역 상태 변경 시 사용
  /** 전역에서 editId가 업데이트 되었을 시 작동, 데이터 가져옴 (this.state, editPublisher.state에 확정) */
  private registerEditData(): void {
    const { editId, postData } = mainPublisher.state;
    if (editId === -1) return;
    const editData = postData.find(({ id }) => editId === id);
    if (!editData) return;

    editPublisher.setState({ ...editPublisher.state, editData });
    mainPublisher.setState({ ...mainPublisher.state, editId: initMainState.editId }, { notExec: true });
    this.setState({ ...this.state, editData }, { isSetEvents: false });
  }
  // ------
}
export default EditPage;
