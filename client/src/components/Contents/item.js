import Component from "../../core/component.js";
import DetailPage from "../DetailPages/detailPage.js";
import StarBtn from "../starBtn.js";

export default class Item extends Component{

    template(){
        const {item}=this.$props;
        return `
            <a href=#${item.idx} class="route"><div class="categoryItem">
                <img data-src=${item.imageUrl} class="categoryImg lazy">
                <h3 class="itemTitle">${item.title}</h3>
                <p class="itemDescription">${item.summaryContent}</p>
                <div class="itemMeta">
                    <p class="itemCompany">by ${item.mediaName}</p>
                </div>
            </div><a>
            <StarBtn data-component="StarBtn"></StarBtn>
        `
    }

    mount(){
        const $starBtn=this.$target.querySelector('[data-component="StarBtn"]');
        new StarBtn($starBtn,this.$props.item);
    }

    setEvent(){
        this.addEvent('click','.categoryItem',()=>{
            window.addEventListener('hashchange',()=>{
                const $detailPage=document.querySelector('[data-component="DetailPage"]');
                $detailPage && new DetailPage($detailPage,this.$props);
            },{once:true})
        });
    }

}