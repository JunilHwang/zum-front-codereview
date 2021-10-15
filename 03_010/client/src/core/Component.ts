import { subscribe } from '@src/lib/observer';

export default class Component<T = void> {
  public $target: HTMLElement;
  public props: T;
  public keys: string[];
  public componentId: string | null;

  constructor($target: HTMLElement, props: T) {
    this.$target = $target;
    this.componentId = null;
    this.props = props;
    this.keys = [];
    this.init();
  }

  init() {
    this.initializeState();
    this.setEvent();
    this.render();
  }

  initializeState() {}

  htmlTemplate() {
    return '';
  }

  useEffect() {}

  mountChildComponent() {}

  subscribe() {
    if (this.componentId) {
      this.keys.forEach((key) =>
        subscribe(key, this.componentId, this.render.bind(this))
      );
    }
  }

  render() {
    this.$target.innerHTML = this.htmlTemplate();
    this.mountChildComponent();
    this.useEffect();
  }

  setEvent() {}
}
