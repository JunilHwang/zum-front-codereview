import { createContext } from '@/core';

export const Context = createContext({
  match: null,
  history: null,
  location: null,
});
