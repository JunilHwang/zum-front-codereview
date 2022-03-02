export abstract class Page {
  constructor(protected changeState: Function) {}
  protected root = document.querySelector("#root")!;

  protected addToRoot(element: HTMLElement) {
    this.root.appendChild(element);
  }

  abstract update(): void;

  static formatDate(date: string) {
    return new Date(Date.parse(date) + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");
  }
}
