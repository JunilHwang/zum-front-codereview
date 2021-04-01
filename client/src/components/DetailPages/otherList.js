import Component from "../../core/component.js";
import DetailPage from "./detailPage.js";

export default class OtherList extends Component{
    template(){
        const{item}=this.$props;
        return `
        <a href=#${item.idx} class="route"><div class="otherItem">
            ${item.imageUrl ? `<img src=${item.imageUrl} alt="otherImg" class="otherImg">`:``}
            <p class="otherTitle">${item.title}</p>
        </div></a>
        `
    }

    setEvent(){
        this.addEvent('click','.otherItem',()=>{
            window.addEventListener('hashchange',()=>{
                const $detailPage=document.querySelector('[data-component="DetailPage"]');
                $detailPage && new DetailPage($detailPage,this.$props);
            },{once:true})
        })
    }
}