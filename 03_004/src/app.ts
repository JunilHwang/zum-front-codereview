import Component from "./core/component";
import Router from "./core/router";

import Menu from "./components/menu";
import Home from "./components/home";
import Life from "./components/life";
import Travel from "./components/travel";
import Culture from "./components/culture";
import Favorite from "./components/favorite";
import Food from "./components/food";
import PageComponent from "./components/pageComponent";

export default class App extends Component {
  router: Router;
  menu: Menu;
  page: PageComponent;
  pages: any;

  initialize(): void {
    // const menuElement = document.createElement('div');
    // this.target.appendChild(menuElement);
    // const pageElement = document.createElement('div');
    // this.target.appendChild(pageElement);
    this.menu = new Menu();

    this.pages = {};
    this.pages.home = new Home();
    this.pages.life = new Life();
    this.pages.food = new Food();
    this.pages.travel = new Travel();
    this.pages.culture = new Culture();
    this.pages.favorite = new Favorite();

    this.router = new Router(this);
  }

  template(): string {
    return `
      <div id="menu"></div>
      <div id="page"></div>
    `;
  }

  postRender(): void {
    const menuElement = document.getElementById('menu');
    this.menu.setTarget(menuElement);
    this.menu.render();

    const pageElement = document.getElementById('page');
    this.page.setTarget(pageElement);
    this.page.render();
  }

  changePage(pageName: string): void {
    this.page = this.pages[pageName];
    this.page.load();
    this.menu.selectMenu(pageName);
    this.render();
  }
}