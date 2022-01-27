import App from './components/App';
import './style/style.scss';
import Header from './components/Header';

const $root = document.getElementById('root');
$root.innerHTML = `<div class=app></div>`;

App($root);
