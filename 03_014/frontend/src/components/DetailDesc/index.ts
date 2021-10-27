import { Component } from "@src/core";
import { appStore, AppStoreState } from "@src/utils/store";
import { DetailContent } from "@src/utils/types";
import "./style.scss";

class DetailDesc extends Component {
  setTemplate(): string {
    const { detailData } = appStore.state as AppStoreState;
    const { articleHtml, articleInfoDate } = detailData as DetailContent;
    const convertArticleHtml = articleHtml ? articleHtml.replace(/data-src/g, "src") : '';

    return `
    <div class="detail__desc__inner">
      <div class="article">${convertArticleHtml || articleHtml}</div>
      <div class="grayline"></div>
      <div class="article__info">
        <span class="date">${articleInfoDate}</span>
        <div class="buttons">
          <button id="go-list" class="default-style">목록</button>
          <a href="/favorites">즐겨찾기</a>
        </div>
      </div>
    </div>
    `;
  }
}

export default DetailDesc;
