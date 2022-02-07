export default class Component {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setMountEvent()
  }
  setup() { }
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent()
  }
  setMountEvent() { }
  setEvent() { }
  setState(newState) { //상태값 갱신
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
