import AbstractView from "../core/AbstractView.js";

export default class Culture extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    await super.getData("http://localhost:5500/api/content/culture");
    await this.render();
  }
}
