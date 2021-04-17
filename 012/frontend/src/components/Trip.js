import AbstractView from "../core/AbstractView.js";

export default class trip extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    await super.getData("http://localhost:5500/api/content/trip");
    await this.render();
  }
}
