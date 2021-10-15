import { setHome } from "./src/pages/Home.js";
import { setLife } from "./src/pages/Life.js";
import { setTravel } from "./src/pages/Travel.js";
import { setFood } from "./src/pages/Food.js";
import { setCulture } from "./src/pages/Culture.js";
import { setFav } from "./src/pages/Fav.js";

const contentDiv = document.querySelector("#contentDiv");

const routes = {
  "": "Home",
  "홈": "Home",
  "라이프": "Life",
  "여행": "Travel",
  "음식": "Food",
  "컬처": "Culture",
  "즐겨찾기": "Favorite",
};


function renderHTML(menu: any) {
  switch (menu) {
    case ("/Home" || "/"):
      setHome();
      break;
    case "/Life":
      setLife();
      break;

    case "/Travel":
      setTravel();
      break;

    case "/Food":
      setFood();
      break;

    case "/Favorite":
      setFav();
      break;

    case "/Culture":
      setCulture();
      break;
    default:
      setHome();
  }
}

export const initialRoutes = (element: any) => {
  const baseUrI = element.baseURI.split("/");
  renderHTML(baseUrI[baseUrI.length - 1] = "" ? "/Home" : "/"+ baseUrI[baseUrI.length - 1]);
  window.onpopstate = () =>
    renderHTML(window.location.pathname);
};

contentDiv ? initialRoutes(contentDiv) : null;

export const historyRouterPush = (pathName: any, element: any) => {
  window.history.pushState({}, pathName, window.location.origin + pathName); 
  renderHTML(pathName);

};

class Component {
  $target;
  $state;
  constructor($target: any) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

function setPath({ target }: any) {
  if (!target.matches("#menus > li")) return;
  const pathName = "/" + routes[target.innerText];
  historyRouterPush(pathName, contentDiv);
}

class Router extends Component {
  setup() {
    this.$state = {
      items: ["홈", "컬처", "음식", "라이프", "여행", "즐겨찾기"],
    };
  }
  template() {
    const { items } = this.$state;
    return `
      <ul id="menus">
      ${items.map((item: any) => `<li class="li">${item}</li>`).join("")}
      </ul>
      
      `;
  }
  setEvent() {
    const $menus = document.getElementById("menus");
    if ($menus) {
      $menus.onclick = setPath;
    }   
  }
}

new Router(document.querySelector(".nav"));
