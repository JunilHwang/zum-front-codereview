export default class Component {
  constructor($target, $url = '', $keyword = 'home', $step = 0) {
    this.$target = $target;
    this.$state = {};
    this.$url = $url;
    this.$step = $step;
    this.$keyword = $keyword;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
  setState() {}
}
