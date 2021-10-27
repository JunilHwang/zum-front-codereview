import { Component } from "@src/core";
import { HubContent } from "@src/utils/types";
import "./style.scss";

import starImg from "@public/images/star.png";
import unstarImg from "@public/images/unstar.png";
import { appStore, AppStoreState } from "@src/utils/store";

class TabContentItem extends Component {
  setBeforeStarted(): void {
    this.options.keepAdding = true;
  }

  setTemplate(): string {
    const { idx, imageUrl, mediaName, summaryContent, title, url } = this.props.data as HubContent;
    const { favorites } = appStore.state as AppStoreState;
    const isFavorite = favorites && favorites.includes(+idx);

    return `
    <li class="tab__content__item">
      <input type="hidden" name="idx" value=${idx} />
      <span class="star">
        <img src=${isFavorite ? starImg : unstarImg} alt="">
      </span>
      <a href=${`/detail?idx=${idx}`} class="item">
        <span class="thumb">
          <img src="${imageUrl}" alt="" />
        </span>
        <span class="title">${title}</span>
        <span class="desc">${summaryContent}</span>
      </a>
      <span class="author">
        <span class="pre">by</span>
        <span class="name">${mediaName}</span>
      </span>
    </li>
    `;
  }
}

const tabContentItemExportProps = {
  className: "tab__content__item",
  starClassName: "star",
};
export { tabContentItemExportProps };
export default TabContentItem;
