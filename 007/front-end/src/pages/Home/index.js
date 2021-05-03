import { Component } from '../../core';
import { contentCardListNames } from '../../contants';
import { TopTwelveContentCardList, ContentCardList } from '../../components';

export default class Home extends Component {
  initState() {
    if (this.store) {
      this.observe(this.setState.bind(this));
      this.state = this.store.getState();
    }
  }

  makeTemplate() {
    const { topFourContents } = this.state;
    return `<div>Home</div>
    <div id='content-card-list-container'>
      ${topFourContents
        .map((contents, index) => {
          return `<ul class='content-card-list' data-key='${index}'></ul>`;
        })
        .join('')}
    </div>
    <div id='top-twelve-contents-card-list-container'>
      <ul id="top-twelve-contents-card-list">
      </ul>
    </div>
    `;
  }

  mounted() {
    const contentCardLists = this.target.querySelectorAll('.content-card-list');
    const topTwelveContentsCardList = this.target.querySelector(
      '#top-twelve-contents-card-list'
    );
    const { topFourContents, topTwelveContents } = this.state;

    if (topFourContents.length !== 0) {
      contentCardLists.forEach((list, index) => {
        new ContentCardList(
          list,
          {
            name: contentCardListNames[index],
            contents: topFourContents[index],
          },
          this.store,
          this.router
        );
      });
    } else {
      this.store.dispatch(this.store.createAction('INIT_CONTENTS'));

      return;
    }

    if (topTwelveContents.length !== 0) {
      new TopTwelveContentCardList(
        topTwelveContentsCardList,
        { topTwelveContents: topTwelveContents },
        this.store,
        this.router
      );
    } else {
      this.store.dispatch(this.store.createAction('INIT_TOP_TWELVE_CONTENTS'));

      return;
    }
  }
}
