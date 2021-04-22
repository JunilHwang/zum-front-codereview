import { Component } from '@/core/Component';
import { Router } from '@/core/Router';
import { createStore } from '@/core/Store';
import { routesMap } from '@/components/App/routeMap';
import { HomePage } from '@/components/HomePage';
import { LifePage, FoodPage, TripPage, CulturePage } from '@/components/SubPage';
import { BookmarkPage } from '@/components/BookmarkPage';
import { DetailPage } from '@/components/DetailPage';
import { reducer, initialState } from '@/reducer';
import '@/components/App/style.scss';

function App($target: Element) {
  return Component.create({
    $target,

    willMount() {
      const store = createStore(reducer, initialState);
      store?.observe(({ count }) => console.log(`Total fetch count: ${count}`));
    },

    mounted() {
      const { $target } = this;
      const { home, life, food, trip, culture, bookmark } = routesMap;

      const routes = {
        [home]: () => HomePage({ $target }),
        [life]: () => LifePage({ $target }),
        [food]: () => FoodPage({ $target }),
        [trip]: () => TripPage({ $target }),
        [culture]: () => CulturePage({ $target }),
        [bookmark]: () => BookmarkPage({ $target }),
        fallback: () => DetailPage({ $target }),
      };

      Router.init(routes);
    },
  });
}

export { App };
