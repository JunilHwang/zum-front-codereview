import { Page } from "./Page";
import { Post } from "../type";
import cache from "../cache";

export class Detail extends Page {
  update() {
    this.fetchData();
  }

  private generateHTML(
    { id, title, author, createdAt, updatedAt, content }: Post,
    pathname: string
  ) {
    return `<h1>제목 : ${title}</h1><h3>번호 : ${id}</h3><h3>작성자 : ${author}</h3><h3>작성일 : ${Page.formatDate(
      createdAt
    )}</h3><h3>수정일 : ${Page.formatDate(
      updatedAt
    )}</h3><p>${content}</p><button data-url=${pathname}/edit>수정</button><button data-url="/api${pathname}/delete">삭제</button>`;
  }

  private async fetchData() {
    const { pathname } = window.location;
    const id = pathname.split("/")[2];
    let data;
    if (cache.getDataById(Number(id))) {
      data = cache.getDataById(Number(id));
    } else {
      const { response } = await (
        await fetch(`${HOST_URL}/api${pathname}`)
      ).json();
      data = response;
      cache.addData(response.id, response);
    }
    const html = this.generateHTML(data, pathname);
    this.render(html);
  }

  private render(html: string): void {
    this.root.innerHTML = "";
    const section = document.createElement("article");
    section.innerHTML = html;
    this.root.appendChild(section);
  }
}
