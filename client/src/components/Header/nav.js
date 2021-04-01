import Component from "../../core/component.js";
import NavItem from "./navItem.js";

export default class Nav extends Component{
    setup(){
        this.$state={
            items:[
                {
                    name:"HOME",
                    link:"Home"
                },
                {
                    name:"라이프",
                    link:"Life"
                },
                {
                    name:"푸드",
                    link:"Food"
                },
                {
                    name:"여행",
                    link:"Trip"
                },
                {
                    name:"컬쳐",
                    link:"Culture"
                },
                {
                    name:"즐겨찾기",
                    link:"Favorite"
                },
            ]
        }
    }

    template(){
        const {items}=this.$state;
        return `
        <nav class="navigator">
            <ul class="menu">
                ${items.map(()=>`<NavItem data-component="NavItem"></NavItem>`).join('')}
            </ul>
        </nav>
        `
    }

    mount(){
        const {items}=this.$state;
        const $NavItem=this.$target.querySelectorAll('[data-component="NavItem"]');
        for(let i=0;i<$NavItem.length;i++){
            new NavItem($NavItem[i],items[i]);
        }
    }
}