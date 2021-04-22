const Component = {
  $target: {} as Element,
  state: {},

  init() {
    this.willMount();
    this.render();
    this.mounted();
    this.addEvent();
  },

  template() {
    return '';
  },

  render() {
    this.$target.innerHTML = this.template();
  },

  mounted() {},

  willMount() {},

  addEvent() {},

  shouldUpdate(prevState: any, nextState: any) {
    return true;
  },

  setState(nextState: any) {
    const prevState = this.state;
    this.state = { ...prevState, ...nextState };
    if (!this.shouldUpdate(prevState, nextState)) return;
    this.render();
  },

  create(source: any) {
    const component = Object.assign(Object.create(Component), source);
    component.init();
    return component;
  },
};

export { Component };
