import AbstractView from "../core/AbstractView.js";

export default class Home extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    await super.getData("http://localhost:5500/api/best");
    await this.render();
  }
}
