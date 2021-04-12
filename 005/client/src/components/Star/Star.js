import Component from '../../core/Component';

export default class Star extends Component {
  setup() {}
  template() {
    return '즐겨찾기';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
}
