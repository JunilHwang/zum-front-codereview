import './src/styles/app-style.scss'
import Logo from './src/image/zumLogo.png';

const img = document.createElement('img');
img.alt = 'logo'
img.src = Logo

const logoDiv = document.querySelector('.left-div');
logoDiv.appendChild(img);
