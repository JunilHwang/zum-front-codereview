import { Detail } from "./component/Detail";
import { CreatePost } from "./component/CreatePost";
import { Home } from "./component/Home";
import { Page } from "./component/Page";
import { Edit } from "./component/Edit";
import cache from "./cache";

class App {
  private route: Page[];
  constructor(private root: HTMLElement) {
    this.route = [
      new Home(this.changeState),
      new Detail(this.changeState),
      new CreatePost(this.changeState),
      new Edit(this.changeState),
    ];

    this.changeState("/");
    window.addEventListener("popstate", ({ state }) =>
      this.changeState(state.url)
    );

    document.addEventListener("click", this.handleClick);
  }

  private changeState = (url: string) => {
    window.history.pushState({ url }, "", url);

    switch (true) {
      case url === "/":
        this.route[0].update();
        break;
      case url.match(/\/post\/[0-9]+$/gm) != null:
        this.route[1].update();
        break;
      case url === "/post/new":
        this.route[2].update();
        break;
      case url.match(/\/post\/[0-9]+\/edit/gm) != null:
        this.route[3].update();
        break;
      default:
        console.log("error");
    }
  };

  private handleClick = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { url } = e.target.dataset;
    if (!url) return;

    if (url.endsWith("delete")) {
      const result = window.confirm("정말 삭제하시겠습니까?");
      if (!result) return;
      fetch(HOST_URL + url.replace("/delete", ""), { method: "DELETE" }) //
        .then(() => {
          cache.clearAllData();
          this.changeState("/");
        });
    } else this.changeState(url);
  };
}

new App(document.querySelector("#root")!);
