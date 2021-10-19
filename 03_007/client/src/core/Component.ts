import { observable, observe } from '@/core/observer';
import { isObjectEqual } from '@/utils';

export default class Component {
  $target: HTMLElement | null | undefined;
  state: object | undefined;
  props;

  constructor($target: HTMLElement | null, props?: any) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.mount();
  }
  initState() {
    return {};
  }
  setup() {
    console.log(this.initState());
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
      this.update();
    });
  }
  mount() {
    // 첫 render 이후 한 번만 동작, ex api
  }
  update() {
    // 첫 render 이후 동작
  }
  setEvent() {
    // event setting
  }
  setState(newState: object) {
    const prev: object | undefined = this.state;
    this.state = { ...this.state, ...newState };
    prev && isObjectEqual(prev, this.state) && this.render();
  }
  template() {
    // html template
    return '';
  }
  render() {
    if (!this.$target) return;
    this.$target.innerHTML = this.template();
  }
}
