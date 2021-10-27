import { DetailDesc, DetailTitle } from "@src/components";
import { Component } from "@src/core";
import { $, createQueryStrings, getData, getUrl } from "@src/utils/funcs";
import { appStore, AppStoreState } from "@src/utils/store";
import { AllContent, DetailContent } from "@src/utils/types";
import "./style.scss";

class DetailSection extends Component {
  setEvents(): void {
    this.$target.addEventListener("click", this.detailGoListClickHandler.bind(this));
  }
  // 목록 버튼만 이벤트 등록 (즐겨찾기는 a Tag로 대체)
  detailGoListClickHandler(e: Event | MouseEvent): void {
    if (!e.target) return;
    const target = e.target as Element;
    if (target.tagName !== "BUTTON") return;
    const goListId = "go-list";
    if (target.id === goListId) window.history.back();
  }

  setTemplate(): string {
    return `
      <div class="detail__section">
        <div class="detail__title"></div>
        <div class="detail__desc"></div>
      </div>
    `;
  }

  setRenderChildren(): void {
    const { detailData } = appStore.state as AppStoreState;
    if (!detailData) return;

    new DetailTitle($(".detail__title", this.$target)!, detailData);
    new DetailDesc($(".detail__desc", this.$target)!, detailData);
  }
}

export default DetailSection;
