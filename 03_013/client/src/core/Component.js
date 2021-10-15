/* eslint-disable class-methods-use-this */
import { observe } from './observer';

export default class Component {
  state;

  props;

  $el;

  constructor($el, props) {
    this.$el = $el; // #app
    this.props = props;
    this.setup();
  }

  setup() {
    observe(() => {
      // state가 변경되면, 콜백 함수 실행.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  template() {
    return '';
  }

  render() {
    this.$el.innerHTML = this.template();
  }

  setEvent() {}

  mounted() {}
}
