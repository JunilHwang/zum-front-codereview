import Component from "../../core/component.js";
import Nav from "./nav.js";

export default class Header extends Component{
    template(){
        return `
        <header class="header">
            <a href=#Home class="route"><img src="https://hub.zum.com/resources/pc/images/logo_zum_2x-78df1cde157641c8f4178f86826539e8.png" alt="Logo" class="Logo"></a>
            <Nav data-component="Nav"></Nav>
        </header>`
    }

    mount(){
        const $Nav=this.$target.querySelector('[data-component="Nav"]');
    
        new Nav($Nav,null);
      }
}