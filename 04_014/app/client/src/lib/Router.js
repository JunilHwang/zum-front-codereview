class Router {
  
  routes; base; index; root; app; cur; eventBounder;
  
  constructor(){

    this.cur = 0;
    this.routeState = { value : "" };

  }
  
  subscribe(app){
    this.app = app;
  }

  setRoutes( routes ){
    this.routes = routes
  }

  setRoot(root){
    if(!this.root && !root) this.root = document.querySelector('#root')
    if(!this.root) this.root = root 
    // console.log(this.root)
    try{
      this.app.setRoot(this.root);
      this.app.onLoad();
      // this.app.setEvent();

    }catch(err){
      if(err instanceof TypeError){ 
        return this.serverRender()
      }
    }
  }


  setIndex(index){
    this.index =Number(index)
  }
  
  setPathCur(newCur, serverRender=false){

    newCur = newCur === '/list' ? '/' : newCur
    this.cur = this.routes.filter( 
      route => route.path === newCur )[0].comPosition;
    
    this.app.curPos = this.cur; 

    if( !serverRender ){
      if(location.search.includes('index')){
        this.setIndex(location.search.split('=')[1])
      }
      this.templateRender()
    }

  }

  templateRender(){
    this.root.innerHTML = this.app.template();
    this.setRoot(this.root)
  }
  
  serverRender(){
    // console.log('asdfasdfasdfdsa=========', this.app.state)
    return this.app.template();
  }
}

export default Router;