import Component from "../../core/component.js";
import Item from "./item.js";

export default class ContentItem extends Component{
    template(){
        return `
            <li class="contentItem">
                <h2 class="categoryName">${this.$props.key}</h2>
                <div class="category">
                    ${this.$state && Object.keys(this.$state).map(()=>`<Item data-component="Item"></Item>`).join('')}
                </div>
            </li>
        `
    }
    mount(){
        if(!this.$state){
            const newState=[];
            for(let i=0;i<4;i++){
                newState.push(this.$props.value[i]);
            }
            this.setState(newState);
        }
        else{
            const $Item=this.$target.querySelectorAll('[data-component="Item"]');
            for(let i=0;i<$Item.length;i++){
                new Item($Item[i],{items:this.$state,item:this.$state[i],api:this.$props.api});
            }
        }
    }
}