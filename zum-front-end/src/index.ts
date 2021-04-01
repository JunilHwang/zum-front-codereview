import { zumRoute } from "./lib/zum-router";
import zumStore from "./store/index";
import HomePage from "./view/homePage/index";
import LifePage from "./view/lifePage/index";
import FoodPage from "./view/foodPage/index";
import TravelPage from "./view/travelPage/index";
import CulturePage from "./view/culturePage/index";
import FavoritesPage from "./view/favoritesPage/index";
import DetailPage from "./view/detailPage/index";
import "./layout.css";

// store
if (window["$store"] === undefined)
  window["$store"] = zumStore;

// Route Hash Route Event
zumRoute([
  { path: "/", component: HomePage },
  { path: "/LifePage", component: LifePage },
  { path: "/FoodPage", component: FoodPage },
  { path: "/TravelPage", component: TravelPage },
  { path: "/CulturePage", component: CulturePage },
  { path: "/FavoritesPage", component: FavoritesPage },
  { path: "/DetailPage", component: DetailPage },
]);
