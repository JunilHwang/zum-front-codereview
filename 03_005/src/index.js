import './css/index.css';
import Main from './page/Main.js';

const app = document.getElementById('app');
new Main(app);

if (module.hot) {
  module.hot.accept('./index.js', () => {
    renderApp = require('./index.js');
  });
}