import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import { Navigator } from '@/components';
import { MainLogo } from '../MainLogo';
import headerStyle from './header.module.scss';

interface HeaderProps {}

const { header, headerInner } = headerStyle;

export const Header: FunctionComponent<HeaderProps> = () => {
  return createElement(
    `
  <header class="${header}"></header>`,
    [createElement(`<div class="${headerInner}"></div>`, [MainLogo({})]), Navigator({})]
  );
};
