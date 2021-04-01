import Component from "../core/component.js";

export default class StarBtn extends Component{
    template(){
        const item=this.$props;
        return `
            <button class="star">
                ${localStorage.getItem(item.idx)?`<i class="fas fa-star"></i>`:`<i class="far fa-star"></i>`}
            </button>
        `
    }

    setEvent(){
        const item=this.$props;
        this.addEvent('click','.star',(e)=>{
            this.toggleFavorite(item);
            this.render();
        });
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
}