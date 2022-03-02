import router from '@router/router';

import './index.css';

window.addEventListener('load', (e: Event) => {
  router.render();
});

window.addEventListener('pushstate', (e: Event) => {
  router.render();
});
