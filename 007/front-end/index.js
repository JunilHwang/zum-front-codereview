import App from './App.js';
import { AppStore, AppReducer } from './src/flux';
import { AppRouter } from './src/routers';
import { sendAPIRequest } from './src/miidlewares';

window.addEventListener('DOMContentLoaded', function () {
  const app = document.querySelector('#app');
  const appReducer = new AppReducer();
  const appStore = new AppStore(appReducer);
  appStore.applyMiddlewares([sendAPIRequest]);
  const appRouter = new AppRouter(appStore);

  new App(app, null, appStore, appRouter);
});
