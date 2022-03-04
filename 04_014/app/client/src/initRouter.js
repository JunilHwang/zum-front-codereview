import Router from "./lib/Router";

const initRouter = (url, app, serverSide=false) => {
 
  const router = new Router();

  router.subscribe(app);
  router.setRoutes( 
    [
      { path : '/',
        comPosition : 0 
      },
      { path : '/post-single',
        comPosition : 1
      },
      { path : '/post-edit',
        comPosition : 2
      },
      { 
        path : '/nout-found',
        comPosition : 3
      }
    ] 
  )
  
  if( !serverSide ){
    // router.setPathCur(url)  
    router.setRoot(document.querySelector('#root') );
  }

  return router
}

export default initRouter
