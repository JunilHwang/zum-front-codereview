import Component from "../../core/component.js";
import { lazyload } from "../../func/lazyLoading.js";
import OtherList from "./otherList.js";

export default class DetailPage extends Component{

    template(){
        const {item,items}=this.$props;
        return `
        <section class="detailPage">
            <div class="detailTop">
                <h1 class="detailTitle">${item.title}</h1>
                <p class="detailMedia">by ${item.mediaName}</p>
            </div>

            <div class="detailDescription"></div>
            <div class="loadingSpinner"><div class="spinner"></div></div>

            <div class="detailButtom">
                <h2 class="otherTitle">같은 카테고리의 추천글</h2>
                <ul class="otherList">
                    ${Object.keys(items).map(()=>'<OtherList data-component="OtherList"></OtherList>').join('')}
                </ul>
                <button class="favorite">
                    즐겨찾기 
                    ${localStorage.getItem(item.idx)?`<i class="fas fa-star"></i>`:`<i class="far fa-star"></i>`}
                </button>
            </div>
        </section>
        `
    }

    async mount(){
        const targetTag=this.$target.querySelector('.detailDescription');
        const loadingSpinner=this.$target.querySelector('.loadingSpinner');
        const detailButtom=this.$target.querySelector('.detailButtom');

        loadingSpinner.classList.add('on');

        const descriptionHTML=await this.getDetail();

        targetTag.innerHTML=descriptionHTML;
        this.lazyLoading(targetTag.querySelectorAll('img[data-src]')); 
        loadingSpinner.classList.remove('on');
        detailButtom.classList.add('on');

        const $OtherList=this.$target.querySelectorAll('[data-component="OtherList"]');
        for(let i=0;i<$OtherList.length;i++){
            const otherItems=[];
            for(let j=1;j<=4;j++){
                let index=(i+j)%$OtherList.length;
                otherItems.push(this.$props.items[index])
            }
            new OtherList($OtherList[i],{items:otherItems,item:this.$props.items[i],api:this.$props.api});
        }
    }

    setEvent(){
        this.addEvent('click','.favorite',()=>{
            this.toggleFavorite(this.$props.item);
            location.href='#Favorite'
        })
    }

    /* 즐겨찾기 데이터 LocalStorage Toggle */
    toggleFavorite(item){
        if(localStorage.getItem(item.idx)==null){
            const time=this.getLocalStorageMax()+1;
            const tempItem={...item,time};
            localStorage.setItem(item.idx,JSON.stringify(tempItem));
        }
        else{
            localStorage.removeItem(item.idx);
        }
    }
    getLocalStorageMax(){
        let max=0;
        for(let i=0;i<localStorage.length;i++){
            max=Math.max(max,JSON.parse(localStorage.getItem(localStorage.key(i)))['time']);
        }
        return max;
    }

    /* 상세데이터 요청 */
    async getDetail(){
        const {item,api}=this.$props;
        const url=this.urlParsing(item.url);
        return await api.getDataText(`/api/detail/${url}`);
    }
    urlParsing(url){
        const urlTokens=url.split('/');
        return urlTokens.join('_');
    }

    //Lazy Loading
    lazyLoading(nodeList){
        nodeList.forEach(element => {
            element.classList.add('lazy');
        });
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
}