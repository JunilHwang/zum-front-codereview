import cache from "../cache";
import { Page } from "./Page";

export class Edit extends Page {
  private id: string = "";
  update(): void {
    this.fetchData();
  }

  private generateHTML(title: string, author: string, content: string) {
    return `<label for="title">제목</label><input id="title" type="text" name="title" placeholder="제목" required value=${title} /><label for="author">작성자</label>
<input id="author" type="text" name="author" placeholder="작성자" required  value=${author} /><label for="content">내용</label>
<textarea id="content" type="text" name="content" placeholder="내용" required>${content}</textarea>
<button type="submit">작성</button>`;
  }

  fetchData() {
    this.id = window.location.pathname.split("/")[2];
    const data = cache.getDataById(Number(this.id));
    const html = this.generateHTML(data.title, data.author, data.content);
    this.render(html);
  }

  private render(html: string) {
    this.root.innerHTML = "";
    const form = document.createElement("form");
    form.innerHTML = html;
    this.root.appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) return;

      const { value: title } = e.target.elements.namedItem(
        "title"
      )! as HTMLInputElement;
      const { value: author } = e.target.elements.namedItem(
        "author"
      )! as HTMLInputElement;
      const { value: content } = e.target.elements.namedItem(
        "content"
      )! as HTMLInputElement;

      if (!title || !author || !content) return;
      const data = { title, author, content };

      fetch(`${HOST_URL}/api/post/${this.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }) //
        .then(() => {
          cache.clearAllData();
          this.changeState("/");
        });
    });
  }
}
