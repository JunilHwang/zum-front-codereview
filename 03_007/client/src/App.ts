import Component from './core/Component';
import { Main } from '@/pages';
import { Header } from '@/components';
import { getView } from '@/routes';
import { activateNavMenu } from '@/utils';
import './style/globalStyle.scss';
import './App.scss';

export default class App extends Component {
  state:
    | {
        $main: HTMLElement | null;
      }
    | undefined;
  setup() {
    super.setup();
    this.state = { $main: null };
  }

  setEvent() {
    super.setEvent();
    window.addEventListener('popstate', () => {
      if (!this.state?.$main) return;
      getView(location.pathname, this.state?.$main, {});
      const currentPath =
        location.pathname === '/'
          ? 'HOME'
          : location.pathname.substring(1).toUpperCase();
      const $menuNode: HTMLElement | null | undefined =
        this.$target?.querySelector('[data-component="navigation"]');
      if (!$menuNode) return;
      const $selectedMenuItem: HTMLElement | Element | null | undefined =
        $menuNode?.querySelector(`[data-key=${currentPath}]`);
      if (!$selectedMenuItem) return;
      activateNavMenu($menuNode, $selectedMenuItem);
    });
  }

  template(): string {
    super.template();
    return `
    <header data-component='header'></header>
    <main></main>
  `;
  }

  update() {
    this.setState({ $main: this.$target?.querySelector('main') });

    /* Header(navigation) */
    const $header: HTMLElement | null | undefined = this.$target?.querySelector(
      '[data-component="header"]',
    );
    const $main: HTMLElement | null | undefined =
      this.$target?.querySelector('main');

    if (!$header) return;
    new Header($header, { outer: $main });

    /* main contents */
    if (!$main) return;
    new Main($main, {});
  }
}
