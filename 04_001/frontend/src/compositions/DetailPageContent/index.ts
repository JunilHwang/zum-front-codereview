import { Component, Props } from "@src/core";
import { mainPublisher } from "@src/core/Store";
import { postDataKorKeys } from "@src/utils/types";
import { PostData } from "@common/types";
import "./style.scss";

interface DetailPageContentProps extends Props {
  dataId?: string;
}

interface PostDataHTMLType {
  textInfoStrings: string;
  contents: string;
}

class DetailPageContent extends Component<{}, DetailPageContentProps> {
  protected setTemplate(): string {
    const { componentId, props } = this;
    const dataId = props.dataId ? +props.dataId : -1;

    const { textInfoStrings, contents } = this.createPostDataStrings(dataId);

    return `
    <div class="detail__page--content" data-component-id=${componentId}>
      <ul class="textinfo">${textInfoStrings}</ul>
      <div class="contents">${contents}</div>
    </div>`;
  }

  protected setChildren(): void {}

  protected setEvents(): void {}

  // --------------------------------------------------

  // [1] 일반
  private createPostDataStrings(dataId: number): PostDataHTMLType {
    const postData = mainPublisher.state.postData.find((v) => v.id === dataId);
    if (!postData) return { textInfoStrings: "", contents: "" };
    const textInfoItems: string[] = [];

    const keys = Object.keys(postData) as (keyof PostData)[];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "contents") continue;
      const name = postDataKorKeys[keys[i]];
      let value = postData[keys[i]];
      if (keys[i] === "createdDate") value = (value as Date).toLocaleString();
      textInfoItems.push(`<li><span class="name">${name}</span><span>${value ?? ''}</span></li>`);
    }

    return { textInfoStrings: textInfoItems.join(""), contents: postData["contents"] ?? "내용 없음" };
  }
  // ------

  // [2] Events
  // ------

  // [3] 전역 상태 변경 시 사용
  // ------
}
export default DetailPageContent;
