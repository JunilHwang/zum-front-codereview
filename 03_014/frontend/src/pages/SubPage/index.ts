import { ErrorView, LoadingView } from "@src/components";
import { Header, TabSection } from "@src/composition";
import { Component, Subscriber } from "@src/core";
import { $ } from "@src/utils/funcs";
import { appStore, AppStoreState } from "@src/utils/store";
import "../common.scss";

class SubPage extends Component {
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

    new TabSection($(".tabs", this.$target)!, { pageType: "sub" }, { store: appStore, subscriber: new Subscriber() });
  }
}

export default SubPage;
