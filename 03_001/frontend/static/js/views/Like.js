import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Like");
  }

  async getTemplate() {
    return this.getHtml("like");
  }
}

