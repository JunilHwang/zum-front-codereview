import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types';

interface LinkProps {
  to: string;
}

export const Link: FunctionComponent<LinkProps> = ({ to, textContent, className }) => {
  return createElement(`
  <a href="${to}">
    <button data-route class="${className}">${textContent}</button>
  </a>`);
};
