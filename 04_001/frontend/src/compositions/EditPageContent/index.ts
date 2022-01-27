import { Input, Textarea } from "@src/components";
import { Component, Props } from "@src/core";
import { editPublisher } from "@src/core/Store";

import { postDataKorKeys, PostDataKorKeys } from "@src/utils/types";
import { PostData } from "@common/types";

import "./style.scss";

interface EditPageContentProps extends Props {
  editData?: PostData;
}

class EditPageContent extends Component<{}, EditPageContentProps> {
  protected setTemplate(): string {
    const { componentId } = this;
    const editInfoStrings = this.createEditInfoStrings();
    return `
    <div class="edit__page--content" data-component-id=${componentId}>
      <ul class="editinfo">${editInfoStrings}</ul>
      <div class="editbox"></div>
    </div>`;
  }

  protected setChildren(): void {
    const { editData } = this.props;

    const nameKeys: (keyof PostDataKorKeys)[] = ["subject", "author"];
    nameKeys.forEach((name, i) => {
      if (!editData) return;
      let value = editData[name];
      if (typeof value !== "string") value = "";
      const placeholder = postDataKorKeys[name];
      new Input(`ul.editinfo li[data-key="${i}"]`, { name, type: "text", value, placeholder });
    });

    new Textarea(`.editbox`, {
      name: "contents",
      value: editData && (editData["contents"] ?? ""),
      isFullSize: true,
      placeholder: "하고싶은 말은..?",
    });
  }

  protected setEvents(): void {
    this.registerEditContentsKeyup();
  }

  // --------------------------------------------------

  // [1] 일반
  private createEditInfoStrings(): string {
    const nameKeys: (keyof PostDataKorKeys)[] = ["subject", "author"];
    const editInfoItems: string[] = nameKeys.reduce((result, key, i) => {
      const strItem = `<li data-key=${i}><span class="name">${postDataKorKeys[key]}</span></li>`; // input은 setChildren에서 렌더링
      result.push(strItem);
      return result;
    }, [] as string[]);
    return editInfoItems.join("");
  }
  // ------

  // [2] Events
  private registerEditContentsKeyup(): void {
    this.getEventTarget()?.addEventListener("keyup", (e) => this.handleEditContentsKeyup(e));
  }

  private handleEditContentsKeyup(e: KeyboardEvent | Event): void {
    const $target = e.target as HTMLElement;
    const isTextarea = $target.nodeName === "TEXTAREA" && $target.classList.contains("app-textarea");
    const isInput = $target.nodeName === "INPUT" && $target.classList.contains("app-input");
    if (!isInput && !isTextarea) return;

    if (isTextarea) {
      const contents = ($target as HTMLTextAreaElement).value;
      const { state } = editPublisher;
      editPublisher.setState({ ...state, editData: { ...state.editData, contents } });
    } else {
      const name = ($target as HTMLInputElement).name;
      const value = ($target as HTMLInputElement).value;
      const { state } = editPublisher;
      editPublisher.setState({ ...state, editData: { ...state.editData, [name]: value } });
    }
  }
  // ------

  // [3] 전역 상태 변경 시 사용
  // ------
}
export default EditPageContent;
