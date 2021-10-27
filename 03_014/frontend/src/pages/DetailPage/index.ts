import { ErrorView, LoadingView } from "@src/components";
import { Header, DetailSection } from "@src/composition";
import { Component, Subscriber } from "@src/core";
import { $, createQueryStrings } from "@src/utils/funcs";
import { appStore, AppStoreState, setDetailDataToAppStore } from "@src/utils/store";
import "../common.scss";

class DetailPage extends Component {
  setBeforeStarted(): void {
    const queryStr = window.location.search;
    if (!queryStr) this.options.stopInit = true;
    else {
      this.setStoreSubscriber(appStore, new Subscriber());
      const queryInfo = createQueryStrings(queryStr);
      if (!queryInfo || !queryInfo.length) return;

      const detailIdx = +queryInfo[0].VALUE!;
      if (!detailIdx || isNaN(detailIdx)) return;

      setDetailDataToAppStore(detailIdx);
    }
  }

  setTemplate(): string {
    const { isError, isLoading } = appStore.state as AppStoreState;
    return `
    <header class="header"></header>
    <main class="${isError || isLoading ? "loading__error" : "detail"}"></main>
    `;
  }

  setRenderChildren(): void {
    const { isError, isLoading } = appStore.state as AppStoreState;

    new Header($(".header", this.$target)!);
    if (isError || isLoading) {
      if (isError) new ErrorView($(".loading__error", this.$target)!);
      else if (isLoading) new LoadingView($(".loading__error", this.$target)!);
      return;
    }

    new DetailSection($("main.detail", this.$target)!, {}, { store: appStore, subscriber: new Subscriber() });
  }
}

export default DetailPage;
