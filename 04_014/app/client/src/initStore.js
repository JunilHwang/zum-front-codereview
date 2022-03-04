import Store from "./lib/Store";
import { actionHandler } from './action.js'

const initStore = (state, app, serverSide=false) => {
 
  const store = new Store();
  store.subscribe(app);
  store.initState(state);
 
  if( !serverSide ){
    let temp ;
    Object.entries(actionHandler.cacheHandler)
      .forEach(([ handler, func ]) => {
        temp = func
        store.cacheHandler[handler] = temp.bind(store);
    })
    store.cacheHandler.setCache();
  }

  return store 
}

export default initStore
