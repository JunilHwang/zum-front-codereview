class Component{
  
  el; components; child; firstBonder; secondBonder; name; curPos; oldPos; root; state

  constructor({ name, state }){
    this.components=[];
    this.child =[];
    this.name = name;
    this.state = state;
    this.curPos = 0;
    this.oldPos = 0;    
    
    this.firstBonder = this.eventHandler.bind(this);
    this.secondBonder = this.secondEventHandler.bind(this);
  }
  
  setState(state){
    this.state = state; // for serverside rendering
    // console.log('=========================this.state, this.curPos',this.state, this.curPos)
    if(this.components.length > 0){
      this.components[this.curPos].setState(state)
    }
    if(this.child.length > 0){
      this.child.map(node => node.setState(state))
    }
  }
  setRoot(root){
    if(!this.root)  this.root = root;
    this.el =  this.root.querySelector(`#${this.name}`);
    // console.log("setRooooot=", this.root, this.el, this.name)
    
    if(this.components.length > 0){
      this.components[this.curPos].setRoot(root);
    }

    if(this.child.length > 0){
      this.child.map(node => node.setRoot(root));
    }
    // console.log(root, 'setRoot', this.el)
    this.setEvent();
  }
  
  setEvent(){
  }

  eventHandler(){

  }

  secondEventHandler(){
    
  }

  template(){
    let renderHtml='';
    if(this.components.length > 0){
      renderHtml = this.components[this.curPos].template();
      // console.log('this app name=', this.name, this.state, renderHtml)

    } 

    if(this.child.length > 0){
      renderHtml = this.child.map(node => node.template()).join('')
    }

    return `
      <div id=${this.name}>
        ${renderHtml}
      </div>
    `;

  }
  
  render(){
    // this.child.map(node => node.render())

    this.el.innerHTML= this.template() //(should be oldOne after diff);
    requestAnimationFrame(()=> this.setRoot())
      // console.log("rendering here =", this.name, this.el)

  }

}

export default Component