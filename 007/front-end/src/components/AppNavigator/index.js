import { Component } from '../../core';
import { navigatorButtons } from '../../contants';

export default class AppNavigator extends Component {
  makeTemplate() {
    return navigatorButtons
      .map(button => {
        return `<button data-pageid="${button.pageId}">${button.name}</button>`;
      })
      .join('');
  }

  setEvent() {
    this.target.addEventListener('click', event => {
      const { dataset } = event.target;

      if (dataset.pageid) {
        this.router.pushState(dataset.pageid);
      }
    });
  }
}
