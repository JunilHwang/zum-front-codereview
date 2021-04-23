export default class Component {
  constructor($target) {
    this.$target = $target;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render(this.state);
  }

  effect() {}
  render() {}
  mount() {}
  addEvent() {}
  getTemplate() {}
}
