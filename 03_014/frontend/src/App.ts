import { Component, Router } from "./core";
import { appStore, setDataToAppStore, setDetailDataToAppStore } from "./utils/store";
import { $, addLocalItem, createQueryStrings, getParseLocalItem } from "./utils/funcs";
import { RouteInfo } from "./utils/types";
import { HomePage, SubPage, DetailPage, FavoritePage } from "./pages";
import "./App.scss";

class App extends Component {
  constructor($app: Element | null) {
    try {
      if (!$app) {
        document.body.insertAdjacentHTML("afterbegin", `<div id="app"></div>`);
        $app = $("#app");
        if (!$app) throw new Error("[!] App component cannot be created.");
      }
      super($app); // this.$target = $app.
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  setBeforeStarted(): void {
    this.options.stopInit = true;
    this.setStores();
    const routeParams: RouteInfo[] = [
      { path: "/", Component: HomePage },
      { path: "/life", Component: SubPage },
      { path: "/food", Component: SubPage },
      { path: "/travel", Component: SubPage },
      { path: "/culture", Component: SubPage },
      { path: "/detail", Component: DetailPage },
      { path: "/favorites", Component: FavoritePage },
    ];
    new Router(this.$target, routeParams, () => {
      appStore.clearSubscribe();
    });
  }

  // ---
  async setStores(): Promise<void> {
    try {
      // localStorage
      addLocalItem("favorites", []);

      // appStore
      await setDataToAppStore();
      const path = window.location.pathname;
      if (path === "/detail") await this.setRefreshDetailData();
      appStore.setState({ favorites: getParseLocalItem("favorites") });
    } catch (error) {
      console.error(error);
    }
  }

  async setRefreshDetailData(): Promise<void> {
    try {
      const queryInfo = createQueryStrings(window.location.search);
      if (!queryInfo || !queryInfo.length) return;
      const detailIdx = +queryInfo[0].VALUE!;
      if (!detailIdx || isNaN(detailIdx)) return;
      await setDetailDataToAppStore(detailIdx);
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
