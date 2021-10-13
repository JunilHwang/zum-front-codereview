import setInitialStoreData from './lib/setInitialStoreData';
import { renderApp } from './app';

(async () => {
  try {
    await setInitialStoreData();
    renderApp();
  } catch (e) {
    console.error(e);
  }

  // event
  window.addEventListener('hashchange', renderApp);
})();
