import Component from "../../core/component.js";
import { lazyload } from "../../func/lazyLoading.js";
import ContentItem from "./contentItem.js";

export default class Contents extends Component{

    template(){
        return `
            <ul class="contents">
                ${this.$state && Object.keys(this.$state).map((key)=>`<ContentItem data-component="ContentItem" data-key=${key}></ContentItem>`).join('')}
            </ul>
        `
    }

    mount(){
        if(!this.$state){
            const newState={...this.$state};

            const dataPromises=[this.getLife(),this.getFood(),this.getTrip(),this.getCulture()];
            Promise.all(dataPromises).then((data)=>{
                newState['Life']=data[0];
                newState['Food']=data[1];
                newState['Trip']=data[2];
                newState['Culture']=data[3];
                this.setState(newState);
            });
        }
        else{
            const $contentItem=this.$target.querySelectorAll('[data-component="ContentItem"]');
            for(let i=0;i<$contentItem.length;i++){
                const key=$contentItem[i].dataset.key;
                const value=this.$state[key];
                new ContentItem($contentItem[i],{key,value,api:this.$props});
            }

            //Lazy Loading
            lazyload();
            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    }

    async getLife(){
        return await this.$props.getData("/api/content/life");
    }
    async getFood(){
        return await this.$props.getData("/api/content/food");
    }
    async getTrip(){
        return await this.$props.getData("/api/content/trip");
    }
    async getCulture(){
        return await this.$props.getData("/api/content/culture");
    }
}