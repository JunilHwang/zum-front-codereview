import app from './src/views/App.js'
import viewRouter from './src/views/router.js';
import initRouter from './src/initRouter.js';

export function ssr_converter (context) {
  return new Promise(async (resolve, reject) => {

    let { url, state, index } = context;
    let ssr_html; 

    const router = initRouter(url, app, true);

    try{
      app.setState(state);
      router.setPathCur(url, true)

      if(router.cur === 1 || router.cur === 2){
        viewRouter.setIndex(Number(index));
      } 

      ssr_html= router.serverRender();

    }catch(err){
      router.setPathCur('/nout-found', true);
      ssr_html = router.serverRender();
    }

    return  ssr_html 
    ? resolve( ssr_html ) 
    : reject( new Error('SSR error') );
  })
}
