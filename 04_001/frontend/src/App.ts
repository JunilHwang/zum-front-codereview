import { Component, Router, createRouterInfo, TargetType } from "@src/core";
import { editPublisher, mainPublisher } from "./core/Store";

class App extends Component {
  constructor($root: TargetType) {
    super($root);
  }
  protected init(): void {
    if (!this.$target || typeof this.$target === "string") return;
    new Router(this.$target, createRouterInfo(), [mainPublisher, editPublisher]);
  }
}
export default App;
