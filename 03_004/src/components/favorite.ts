import PageComponent from "./pageComponent";

export default class Favorite extends PageComponent {
  template(): string {
    return `
      <div id="favorite-page">
        favorite
      <div>
    `;
  }
}