class Store {
  state; app; cacheHandler;

  constructor(){
    this.cacheHandler = {}; 
  }

  subscribe(app){
    this.app =app;
  }

  initState(initial, server=false){
    this.state = initial;

  }

  setState(newState){
    this.state = { ...this.state, ...newState };
    history.pushState({ state : this.state }, null, location.origin + '/list?' + this.cacheHandler.getCacheId())    

    this.updateView();
  }

  async updateView(){
    if(Object.keys(this.cacheHandler).length !== 0) await this.cacheHandler.searchCache();
    this.renderAll()
  }

  renderAll(){
    // console.log('render All works')
    this.app.render();
  }

  hydrate(newState){
    this.state = newState
  }

}

export default Store;