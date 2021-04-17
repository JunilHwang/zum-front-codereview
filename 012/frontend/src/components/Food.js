import AbstractView from "../core/AbstractView.js";

export default class Food extends AbstractView {
  constructor() {
    super();
  }

  async setUp() {
    await fetch("http://localhost:5500/api/content/food")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.state = data;
        this.render();
      });
  }
}
