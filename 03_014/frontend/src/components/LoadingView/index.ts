import { Component } from "@src/core";
import "./style.scss";

class LoadingView extends Component {
  setTemplate(): string {
    return `
      <div class="loading__view">
        <div class="loading__animation"></div>
        <p class="text">잠시만 기다려주세요..</p>
      </div>
    `;
  }
}

export default LoadingView;
