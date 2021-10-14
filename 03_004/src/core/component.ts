import gss from "../store/globalStateStore";

export default class Component {
  state: any;
  target: Element;
  
  constructor(element?: Element) {
    this.state = {};
    this.target = element;
    this.initialize();
    this.render();

    // 전역 상태가 변화하면 컴포넌트 다시 렌더링
    // TODO : 필요한 컴포넌트만 다시 그리도록 최적화하기..
    gss.events.subscribe('stateChange', () => {
      this.render();
    })
  }

  initialize(): void {}

  setState(newState: any): void {
    this.state = newState;
    this.render();
  };

  setTarget(newTarget: Element): void {
    this.target = newTarget;
  }

  render(): void {
    this.preRender();
    if (this.target) {
      this.renderTemplate();
    }
    this.postRender();
  };

  // 템플릿을 그리기 전
  preRender(): void {};

  // 실제 템플릿 그리기
  renderTemplate(): void {
    this.target.innerHTML = this.template();
  };

  // 템플릿을 그린 후
  postRender(): void {};

  // 컴포넌트의 템플릿. 각 컴포넌트에서 오버라이딩하여 사용
  template(): string {
    return ``;
  }
}