import { Component } from '../../core';
import { ContentCardList } from '../../components';

export default class Travel extends Component {
  initState() {
    if (this.store) {
      this.observe(this.setState.bind(this));
      this.state = this.store.getState();
    }
  }

  makeTemplate() {
    return `<div>Travel</div>
    <div id='content-card-list-container'>
      <ul class='content-card-list'></ul>;
    </div>
    `;
  }

  mounted() {
    const { travelContents } = this.state.contents;
    const contentCardLists = this.target.querySelector('.content-card-list');

    new ContentCardList(
      contentCardLists,
      { contents: travelContents },
      this.store,
      this.router
    );
  }
}
