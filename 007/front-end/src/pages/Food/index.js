import { Component } from '../../core';
import { ContentCardList } from '../../components';

export default class Food extends Component {
  initState() {
    if (this.store) {
      this.observe(this.setState.bind(this));
      this.state = this.store.getState();
    }
  }

  makeTemplate() {
    return `<div>Food</div>
    <div id='content-card-list-container'>
      <ul class='content-card-list'></ul>;
    </div>
    `;
  }

  mounted() {
    const { foodContents } = this.state.contents;
    const contentCardLists = this.target.querySelector('.content-card-list');

    if (foodContents.length !== 0) {
      new ContentCardList(
        contentCardLists,
        { contents: foodContents },
        this.store,
        this.router
      );
    } else {
      this.store.dispatch(this.store.createAction('INIT_CONTENTS'));

      return;
    }
  }
}
