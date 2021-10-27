import { ErrorView, LoadingView } from "@src/components";
import { Header, TabSection } from "@src/composition";
import { Component, Subscriber } from "@src/core";
import { $ } from "@src/utils/funcs";
import { appStore, AppStoreState } from "@src/utils/store";
import "../common.scss";

// SubPage 컴포넌트와 같음!! (setRenderChildren의 pageType만 다름)
class FavoritePage extends Component {
  setBeforeStarted(): void {
    this.setStoreSubscriber(appStore, new Subscriber());
  }

  setTemplate(): string {
    const { isError, isLoading } = appStore.state as AppStoreState;

    return `
    <header class="header"></header>
    <main class="${isError || isLoading ? "loading__error" : "tabs"}"></main>
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

    new TabSection($(".tabs", this.$target)!, { pageType: "favorite" }, { store: appStore, subscriber: new Subscriber() });
  }
}

export default FavoritePage;
