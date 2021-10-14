import PageComponent from "./pageComponent";

export default class Food extends PageComponent {
  template(): string {
    return `
      <div id="food-page">
        food
      <div>
    `;
  }
}