import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("LIFE");
  }

  async getTemplate() {
    return this.getHtml("food");
  }
}
