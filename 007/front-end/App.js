import { Component } from './src/core';
import { AppNavigator } from './src/components';

export default class App extends Component {
  makeTemplate() {
    return `<div id="navigator-container"></div>
    <div id="contents-container"></div>
    `;
  }

  mounted() {
    const contentsContainer = document.querySelector('#contents-container');
    const navigatorContainer = document.querySelector('#navigator-container');
    this.router.setTarget(contentsContainer);
    this.router.replaceState('HOME');

    new AppNavigator(navigatorContainer, null, this.store, this.router);
  }
}
