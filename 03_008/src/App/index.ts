import { createElement } from '@/core/dom';
import { Home, Life } from '@/pages';
import { Header } from '@/components';
import { FunctionComponent } from '@/types/dom';
import route from '@/route';
import { HOME_PAGE, LIFE_PAGE } from '@/route/path';

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return createElement('<div class="app"></div>', [
    Header({}),

    route.Router([
      { path: HOME_PAGE, component: Home },
      { path: LIFE_PAGE, component: Life },
    ]),
  ]);
};

export default App;
