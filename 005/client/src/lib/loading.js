export default class Loading {
  constructor() {
    this.$loadingElement = document.querySelector('.loading_container');
  }
  setup() {}
  open() {
    this.setState({ loading: 'block' });
    this.$loadingElement.style.display = this.$state.loading;
  }
  close() {
    this.setState({ loading: 'none' });
    this.$loadingElement.style.display = this.$state.loading;
  }
  fail() {
    alert('5초를 초과한 api입니다.');
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
  }
}
