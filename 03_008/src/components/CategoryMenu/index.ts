import { createElement } from '@/core/dom';
import { Link } from '@/route/Link';
import { FunctionComponent } from '@/types/dom';
import categoryMenuStyle from './categoryMenu.module.scss';

interface CategoryMenuProps {
  to: string;
}

const { menu } = categoryMenuStyle;

export const CategoryMenu: FunctionComponent<CategoryMenuProps> = ({ to, textContent }) => {
  return createElement(`<li class="${menu}"></li>`, [Link({ to, textContent })]);
};
