import { Component } from "@src/core";
import errorImg from "@public/images/computer.png";
import "./style.scss";

class ErrorView extends Component {
  setTemplate(): string {
    return `
      <div class="error__view">
        <img src=${errorImg}/>
        <p class="text">예기치 못한 오류가 발생했습니다.</p>
        <a href="/">메인으로 이동</a>
      </div>
    `;
  }
}

export default ErrorView;
