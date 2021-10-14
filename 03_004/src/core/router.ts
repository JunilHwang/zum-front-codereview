import App from "../app";
import Culture from "../components/culture";
import Favorite from "../components/favorite";
import Food from "../components/food";
import Home from "../components/home";
import Life from "../components/life";
import Travel from "../components/travel";

export default class Router {
  app: App;

  routes: any = {
    home: Home,
    life: Life,
    food: Food,
    travel: Travel,
    culture: Culture,
    favorite: Favorite,
  }

  constructor(app: App) {
    this.app = app;
    this.app.changePage(this.getPageFromHash());
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  onHashChange(): void {
    this.app.changePage(this.getPageFromHash());
  }

  getPageFromHash(): string {
    let url = location.hash.replace('#', '');
    if (this.routes[url] == undefined) {
      url = 'home';
      location.href = '#';
    }

    return url;
  }
}