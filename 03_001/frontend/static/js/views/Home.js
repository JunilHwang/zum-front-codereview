import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("home");
        this.handleClick;
    }


    async getTemplate() {
        return this.getHtml("ranking");
      }
}

