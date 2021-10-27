import { Component } from "@src/core";
import { appStore, AppStoreState } from "@src/utils/store";
import { DetailContent } from "@src/utils/types";
import "./style.scss";

class DetailTitle extends Component {
  setTemplate(): string {
    const { detailData } = appStore.state as AppStoreState;
    const { subject, category, media } = detailData as DetailContent;
    return `
      <div class="detail__title__inner">
        <span class="category">${category || ""}</span>
        <span class="subject">${subject || ""}</span>
        <span class="author">
          <span class="pre">by</span>
          <span class="name">${media || ""}</span>
        </span>
      </div>
    `;
  }
}

export default DetailTitle;
