import AbstractView from "../core/AbstractView.js";

export default class Life extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    await super.getData("http://localhost:5500/api/content/life");
    await this.render();
  }
}
