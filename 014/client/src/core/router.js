import MainPage from '../pages/MainPage';
import SubPage from '../pages/SubPage';
import DetailPage from '../pages/DetailPage';
import FavoritePage from '../pages/FavoritePage';

class Router {
  constructor({ paths }) {
    this.$pageBody = document.createElement('section');
    this.$pageBody.className = 'pageBody';
    this.paths = paths;
  }

  init() {
    const $app = document.querySelector('#app');
    $app.appendChild(this.$pageBody);
    this.navigate();
  }

  navigate() {
    const curPath = window.location.pathname;
    const isCorrectPath = this.paths.some((path) => path === curPath);

    while (this.$pageBody.hasChildNodes()) {
      this.$pageBody.removeChild(this.$pageBody.firstChild);
    }

    if (curPath === '/') {
      new MainPage(this.$pageBody);
      return;
    }

    if (curPath === '/favorite') {
      new FavoritePage(this.$pageBody);
      return;
    }

    if (isCorrectPath) {
      new SubPage(this.$pageBody);
      return;
    }

    new DetailPage(this.$pageBody);
  }
}

const router = new Router({
  paths: [
    '/', '/life', '/food', '/trip', '/culture', '/favorite',
  ],
});

export default router;
