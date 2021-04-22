import { Component } from '@/core/Component';
import { Router } from '@/core/Router';
import { routesMap } from '@/components/Menu/routesMap';
import '@/components/Menu/style.scss';

interface MenuProps {
  $target: Element;
}

function Menu({ $target }: MenuProps) {
  return Component.create({
    $target,

    template() {
      return `
        <ul class="menu-list">
          ${routesMap
            .map(({ path, title }) => {
              const isCurentPage = path === location.pathname;
              return `
                <li class="${isCurentPage ? 'active' : ''}">
                  <a data-route="${Router.routeSymbol}" href="${path}">${title}</a>
                </li>
              `;
            })
            .join('')}
        </ul>
      `;
    },
  });
}

export { Menu };
