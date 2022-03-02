import { MainPageBoard, MainPageTopBar } from "@src/compositions";
import { Component } from "@src/core";
import "./style.scss";

class MainPage extends Component {
  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="main__page default-page-size" data-component-id=${componentId}></div>`;
  }
  protected setChildren(): void {
    new MainPageTopBar(".main__page");
    new MainPageBoard(".main__page");
  }
}
export default MainPage;
