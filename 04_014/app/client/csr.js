import initStore from './src/initStore.js';
import initRouter from './src/initRouter.js'
import app from './src/components/App.js'
import styles from './styles.css'

const state = globalThis.state || null 
let router  
let store; 


try{
  // console.log(state)
  store = initStore(state, app);
  router= initRouter(location.pathname, app);

  router.setPathCur(location.pathname);
  router.setRoot(document.querySelector('#root'));
}
catch(err){
  alert('일시적 장애 발생')
  location.replace('/')
 
  if(err instanceof TypeError){
    console.log(err)
  }
}

export { store, router }