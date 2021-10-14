import PageComponent from "./pageComponent";

export default class Life extends PageComponent {
  template(): string {
    return `
      <div id="life-page">
        life
      <div>
    `;
  }
}