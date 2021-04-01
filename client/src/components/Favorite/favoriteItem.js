import Component from "../../core/component.js";
import DetailPage from "../DetailPages/detailPage.js";

export default class FavoriteItem extends Component{

    template(){
        const {item}=this.$props;
        return `
            <a href=#${item.idx} class="route"><li class="favoriteItem">
                <div class="favoriteInfo">
                    <h2 class="favoriteItemTitle">${item.title}</h2>
                    <p class="favoriteItemMedia">by ${item.mediaName}</p>
                </div>
                <p class="favoriteDescription">${item.summaryContent}</p>
                <img src=${item.imageUrl} alt="favoriteItemImg" class="favoriteItemImg">
            </li><a>
        `
    }

    setEvent(){
        this.addEvent('click','.favoriteItem',()=>{
            window.addEventListener('hashchange',()=>{
                const $detailPage=document.querySelector('[data-component="DetailPage"]');
                $detailPage && new DetailPage($detailPage,this.$props);
            },{once:true})
        });
    }
}