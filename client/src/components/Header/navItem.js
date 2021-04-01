import Component from "../../core/component.js";

export default class NavItem extends Component{
    template(){
        return `
            <li class="menuItem"><a href=#${this.$props.link} class="route">${this.$props.name}</a></li>
        `
    }

    mount(){
        const $li=this.$target.querySelector('.menuItem');
        if(window.location.hash===`#${this.$props.link}`){
            $li.classList.add('on');
        }
    }
}