import cache from "../cache";
import { Page } from "./Page";

export class CreatePost extends Page {
  update() {
    this.render();
  }

  private generateHTML() {
    return `<label for="title">제목</label><input id="title" type="text" name="title" placeholder="제목" required /><label for="author">작성자</label>
<input id="author" type="text" name="author" placeholder="작성자" required /><label for="content">내용</label>
<textarea id="content" type="text" name="content" placeholder="내용" required></textarea>
<button type="submit">작성</button>`;
  }

  private render() {
    this.root.innerHTML = "";
    const form = document.createElement("form");
    form.innerHTML = this.generateHTML();
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

      fetch(`${HOST_URL}/api/post`, {
        method: "POST",
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
