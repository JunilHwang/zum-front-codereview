import { Router } from '../../core';
import { Home, Life, Food, Travel, Culture, Detail } from '../../pages';

export default class AppRouter extends Router {
  initRoutes() {
    this.routes = {
      HOME: Home,
      LIFE: Life,
      FOOD: Food,
      TRAVEL: Travel,
      CULTURE: Culture,
      DETAIL: Detail,
    };
  }
}
