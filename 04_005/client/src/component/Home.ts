import { Page } from "./Page";
import { Post } from "../type";
import cache from "../cache";

export class Home extends Page {
  update() {
    this.fetchData();
  }

  private generateHTML({ id, title, author, createdAt }: Post) {
    return `<tr><th>${id}</th><td class="title" data-url=/post/${id}>${title}</td><td>${author}</td><td>${Page.formatDate(
      createdAt
    )}</td></tr>`;
  }

  private async fetchData() {
    let data;
    if (cache.getDataById(0)) {
      data = cache.getDataById(0);
    } else {
      const { response } = await (await fetch(`${HOST_URL}/api/post`)).json();
      data = response;
      cache.addData(0, response);
    }
    const html = data.map((item: Post) => this.generateHTML(item)).join("");
    this.render(html);
  }

  private render(html: string) {
    this.root.innerHTML = " ";
    const table = document.createElement("table");
    table.innerHTML = `<thead><tr><td>번호</td><td>제목</td><td>작성자</td><td>작성일</td></thead>${html}`;
    this.root.appendChild(table);
  }
}
