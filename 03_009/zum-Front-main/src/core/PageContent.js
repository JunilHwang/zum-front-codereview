import Component from "./Component";
import "babel-polyfill";
import "../styles/nav.scss";
import { getJsonData, getMenuName } from "../util/util";
import { processToFav, isSaved } from "../util/util.Localstorage";
export default class PageContent extends Component {
  setup() {
    const menu = window.location.pathname;
    this.$state = { items: getJsonData(menu) };
  }
  template() {
    const { items } = this.$state;
    return `
    ${
      window.location.pathname !== "/" && window.location.pathname !== "/Home"
        ? `   <div class="menu-bar">
      <div class="menu-title">${getMenuName(window.location.pathname)}</div>
      </div>`
        : `<h2># 실시간_TOP12_소식 </h2>`
    }

    <div class="div-contents">
    ${items
      .map(
        (item, key) => `
        <div class="content" >
        <div onClick=window.open("${item.url}")>
          <div class="thumbnail"></div>
          <div class="title">${item.title} </div>
          </div>
          <div class="mediaName">by ${item.mediaName} 
          <span class="fav" id="${key}" >${isSaved(item.idx) ? "★" : "☆"}</span>
          </div>
        </div>
      `
      )
      .join("")}
    </div>
    `;
  }
  setEvent() {
    this.$target.querySelectorAll(".fav").forEach((fav) =>
      fav.addEventListener("click", ({ target }) => {
        const status = target.innerText;
        const index = target.id;
        target.innerText = status == "★" ? "☆" : "★";
        const item = getJsonData(window.location.pathname)[index];
        processToFav(item) //저장 혹은 삭제를 하는 함수 실행 
      })
    );
  }
}
