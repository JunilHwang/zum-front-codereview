import Component from '../../core/Component';
import SubPersonal from '../common/SubPersonal/SubPersonal';
export default class SubPage extends Component {
  constructor(target, url, keyword) {
    super(target, url, keyword);
  }
  setup() {
    this.$newUrl = `http://localhost:3000/api/content${this.$url}`;
    this.$subComponent = new SubPersonal(
      this.$target,
      this.$newUrl,
      this.$keyword
    );
  }
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
}
