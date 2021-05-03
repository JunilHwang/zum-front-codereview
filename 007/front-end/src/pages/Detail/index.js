import { Component } from '../../core';

export default class Detail extends Component {
  initState() {
    if (this.store) {
      this.observe(this.setState.bind(this));
      this.state = this.store.getState();
    }
  }

  makeTemplate() {
    const { detailHTML } = this.state;
    return `<div>Detail</div>
    <div id="detail-content-container">${detailHTML}</div>
    `;
  }

  mounted() {
    const { url } = history.state;
    const { detailUrl } = this.state;

    if (url !== detailUrl) {
      this.store.dispatch(this.store.createAction('SET_DETAIL_HTML', { url }));
    }
  }
}
