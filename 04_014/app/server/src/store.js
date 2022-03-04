
class ServerStore{
  state; 
  constructor(state){
    this.state = state ;
  }
  setState(newState){
    this.state = { ...this.state, ...newState }
  }
}



module.exports = { store  : new ServerStore()} ;
