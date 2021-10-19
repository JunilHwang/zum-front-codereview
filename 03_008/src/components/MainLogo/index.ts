import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import zumLogo from '@/../public/assets/zum-logo.png';
import mainLogoStyle from './mainLogo.module.scss';

interface MainLogoProps {}

const { mainLogoHeading, logo, hubText } = mainLogoStyle;

export const MainLogo: FunctionComponent<MainLogoProps> = () => {
  return createElement(`
  <h1 class="${mainLogoHeading}">
    <a href="https://zum.com/">
      <img src="${zumLogo}" alt="zum" class="${logo}" />
    </a>
    <a href="/" class="${hubText}" >
      허브
    </a>
  </h1>`);
};
