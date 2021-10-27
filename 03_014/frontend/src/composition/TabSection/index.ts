import { TabContentList, tabContentItemExportProps } from "@src/components";
import { TabContentListProps } from "@src/components/TabContentList";
import { Component } from "@src/core";
import { contentKeyNames } from "@src/utils/consts";
import { $, getParseLocalItem, setConvertLocalItem } from "@src/utils/funcs";
import { appStore, AppStoreState } from "@src/utils/store";
import { ZumHubContentKeys } from "@src/utils/types";
import "./style.scss";

class TabSection extends Component {
  setEvents(): void {
    this.$target.addEventListener("click", this.itemFavoriteClickHandler.bind(this));
  }
  // 즐겨찾기 버튼 조작 (appStore 기반)
  itemFavoriteClickHandler(e: Event | MouseEvent): void {
    const { className: itemClassName, starClassName } = tabContentItemExportProps;
    if (!e.target) return;
    const closestTarget = (e.target as Element).closest(`.${itemClassName} .${starClassName}`);
    if (!closestTarget) return;

    const inputHiddenIdx = closestTarget.previousElementSibling as HTMLInputElement;
    if (!inputHiddenIdx || !inputHiddenIdx.value) return;
    const idx = +inputHiddenIdx.value;

    if (isNaN(idx)) return;

    const prevFavorites = getParseLocalItem("favorites");
    if (!prevFavorites) return;
    const favorites = prevFavorites.includes(idx)
      ? prevFavorites.filter((prevIdx: number) => idx !== prevIdx)
      : prevFavorites.concat(idx);
    setConvertLocalItem("favorites", favorites);

    appStore.setState({ favorites });
  }

  setTemplate(): string {
    return `
      <div class="tab__section"></div>
    `;
  }

  // TabSection
  setRenderChildren(): void {
    const { pageType } = this.props;
    switch (pageType) {
      case "home":
        return this.setRenderChildrenForHomePage();
      case "sub":
        return this.setRenderChildrenForSubPage();
      case "favorite":
        return this.setRenderChildrenForFavoritePage();
      default:
        break;
    }
  }

  // ---
  // TabSection : RenderChildren - 메인 페이지 (Home)
  setRenderChildrenForHomePage(): void {
    const { hubContentsData } = appStore.state as AppStoreState;
    if (!hubContentsData || !Object.keys(hubContentsData).length) return;

    const resDataKeys = Object.keys(hubContentsData) as ZumHubContentKeys[];

    const { pageType } = this.props;
    resDataKeys.forEach((resDataKey, i) => {
      const props: TabContentListProps = {
        resData: hubContentsData[resDataKey],
        listIdx: i,
        subject: contentKeyNames[resDataKey],
        pageType,
      };
      return new TabContentList($(".tab__section", this.$target)!, props);
    });
  }

  // TabSection : RenderChildren - 서브 페이지 (라이프 / 푸드 / 여행 / 컬쳐)
  setRenderChildrenForSubPage(): void {
    const path = window.location.pathname.slice(1) as ZumHubContentKeys;
    const { hubContentsData } = appStore.state as AppStoreState;
    if (!hubContentsData || !hubContentsData[path]) return;

    const { pageType } = this.props;

    const props: TabContentListProps = {
      resData: hubContentsData[path],
      subject: contentKeyNames[path],
      pageType,
    };
    new TabContentList($(".tab__section", this.$target)!, props);
  }

  // TabSection : RenderChildren - 즐겨찾기 페이지 (Favorite ⭐️)
  setRenderChildrenForFavoritePage(): void {
    const { allDataMap } = appStore.state as AppStoreState;
    const { pageType } = this.props;
    if (!allDataMap) return;

    const favorites = getParseLocalItem("favorites");
    const favoriteData = favorites.map((idx: number) => allDataMap.get(idx));

    const props: TabContentListProps = {
      resData: { data: favoriteData, statusCode: 200, message: "OK (client - from the localStorage)" },
      subject: "즐겨찾기",
      pageType,
    };
    new TabContentList($(".tab__section", this.$target)!, props);
  }
}

export default TabSection;
