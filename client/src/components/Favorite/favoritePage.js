import Component from "../../core/component.js";
import FavoriteItem from "./favoriteItem.js";

export default class FavoritePage extends Component{

    template(){
        return `
            <section class="favorite">
                <h1 class="favoriteTitle">#즐겨찾기</h1>
                <div class="favoriteBox">
                    ${this.$state && `<p class="favoriteLength">글 (${this.$state.favoriteList.length})</p>`}
                    <ul class="favoriteItems">
                        ${this.$state && this.$state.favoriteList.map(()=>`<FavoriteItem data-component="FavoriteItem"></FavoriteItem>`).join('')}
                    </ul>
                </div>
            </section>
        `
    }

    mount(){
        if(!this.$state){
            const favoriteList=[];
            for(let i=0;i<localStorage.length;i++){
                const data=JSON.parse(localStorage.getItem(localStorage.key(i)));
                favoriteList.push(data);
            }
            favoriteList.sort((a,b)=>{
                if(a.time-b.time>0){
                    return -1;
                }
                else if(a.time-b.time===0){
                    return 0;
                }
                else{
                    return 1;
                }
            })
            this.setState({favoriteList:favoriteList});
        }

        else{
            const $favoriteItem=this.$target.querySelectorAll('[data-component="FavoriteItem"]');
            for(let i=0;i<$favoriteItem.length;i++){
                let otherItems=[];
                if($favoriteItem.length<=4){
                    otherItems=this.$state.favoriteList;
                }
                else{
                    for(let j=1;j<=4;j++){
                        let index=(i+j)%$favoriteItem.length;
                        otherItems.push(this.$state.favoriteList[index])
                    }
                }
                new FavoriteItem($favoriteItem[i],{items:otherItems,item:this.$state.favoriteList[i],api:this.$props});
            }
        }
    }
}