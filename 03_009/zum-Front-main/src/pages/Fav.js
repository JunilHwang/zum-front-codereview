import Component from "../core/Component";
import { deleteFromFav, allStorage } from "../util/util.Localstorage";

function isItem() {
  if (localStorage.length > 0) return true;
  return false;
}
export class Fav extends Component {
  //LocalStorage에 저장된 데이터가 있다면 불러와 state에 세팅. 
  setup() {
    if (localStorage.length > 0) {
      this.$state = { items: allStorage() };
    } else {
      this.$state = { items: [] };
    }
  }
  template() {
    const { items } = this.$state;
    return `
    <div class="menu-bar">
    <div class="menu-title">즐겨찾기</div>
    </div>
    <div class="div-contents">
    ${!isItem() ? "<div>즐겨찾기 된 내용이 없습니다</div>" : ""}
    ${
      isItem()
        ? items
            .map(
              (item, key) => `
        <div class="content" >
        <div onClick=window.open("${item.url}")>
          <div class="thumbnail"></div>
          <div class="title">${item.title} </div>
          </div>
          <div class="mediaName">by ${item.mediaName} 
          <span class="fav" id="${key}" >★</span>
          </div>
        </div>
      `).join("")
        : ""
    }
    </div>
    `;
  }
  setEvent() {
    this.$target.querySelectorAll(".fav").forEach((fav) =>
      fav.addEventListener("click", ({ target }) => {
        const { items } = this.$state;
        const index = target.id;

        //localStorage에서 삭제
        deleteFromFav(items[index].idx);
        
        //즐겨찾기된 목록을 삭제시켜 다시 렌더링
        items.splice(index, 1);
        this.setState({ items: items });
      })
    );
  }
}

export function setFav() {
  new Fav(document.querySelector("#contentDiv"));
}
