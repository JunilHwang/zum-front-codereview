import Component from "../../core/component.js";
import DetailPage from "../DetailPages/detailPage.js";

export default class RankItem extends Component{
    template(){
        const {key, item}=this.$props;
        return `
        <a href=#${item.idx} class="route"><div class="rankItem">
            <h1 class="rank">${key+1}</h1>
            <div class="rankInfo">
                <h2 class="rankTitle">${item.title}</h2>
                <p class="rankCompany">by ${item.mediaName}</p>
            </div>
        </div></a>
        `
    }

    setEvent(){
        this.addEvent('click','.rankItem',()=>{
            window.addEventListener('hashchange',()=>{
                const $detailPage=document.querySelector('[data-component="DetailPage"]');
                $detailPage && new DetailPage($detailPage,this.$props);
            },{once:true})
        })
    }
}
