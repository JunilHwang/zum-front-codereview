import { initState } from '@src/lib/observer';

const pageStore = initState({
  key: 'pageStore',
  value: {
    CurrentPage: null,
  },
});

export { pageStore };
