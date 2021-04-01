import Component from "../../core/component.js";
import RankItem from "./rankItem.js";

export default class TopRank extends Component{
    template(){
        return `
            <h1 class="top12">실시간 TOP12</h1>
            <section class="TopRank">
                ${this.$state && Object.keys(this.$state).map((key)=> `<RankItem data-component="RankItem"></RankItem>`).join('')}
            </section>
        `
    }

    mount(){
        if(!this.$state){
            this.getRank().then((data)=>this.setState(data));
        }
        else{
            const $RankItem=this.$target.querySelectorAll('[data-component="RankItem"]');
            for(let i=0;i<$RankItem.length;i++){
                const key=i;
                const value=this.$state[key];

                const otherItems=[];
                for(let j=1;j<=4;j++){
                    let index=(i+j)%$RankItem.length;
                    otherItems.push(this.$state[index])
                }

                new RankItem($RankItem[i],{key:key, item:value,items:otherItems,api:this.$props});
            }
        }
    }

    /* Rank 데이터 요청 */
    async getRank(){
        return await this.$props.getData("/api/best");
    }
}
