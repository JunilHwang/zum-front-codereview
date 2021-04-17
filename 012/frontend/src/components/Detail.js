import AbstractView from "../core/AbstractView.js";

export default class Detail extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    console.log("detail");
    await this.render();
  }
}
