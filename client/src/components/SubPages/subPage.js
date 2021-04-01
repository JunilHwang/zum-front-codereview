import Component from "../../core/component.js";
import { lazyload } from "../../func/lazyLoading.js";
import { throttling } from "../../func/throttling.js";
import SubPageItem from "./subPageItem.js";

export default class SubPage extends Component{
    template(){
        const {link}=this.$props;
        return `
            <h1 class="subPageTitle">${link}</h1>
            <section class="subPage">
                <ul class="subContents">
                    ${this.$state.data.length!==0 && this.$state.data.map(()=>'<SubPageItem data-component="SubPageItem"></SubPageItem>').join('')}
                </ul>
            </section>
        `
    }

    setup(){
        this.$state={
            data:[],
            items:12, // preItems ~ items까지 데이터를 받아옴
            preItems:0, //이전까지 받아온 데이터 index
        }
    }

    async mount(){
        if(this.$state.data.length===0){
            this.LoadData();
        }
        if(this.$state.data.length>0){
            const $SubPageItem=this.$target.querySelectorAll('[data-component="SubPageItem"]');
            for(let i=0;i<$SubPageItem.length;i++){
                const otherItems=[];
                for(let j=1;j<=4;j++){
                    let index=(i+j)%$SubPageItem.length;
                    otherItems.push(this.$state.data[index])
                }
                new SubPageItem($SubPageItem[i],{items:otherItems,item:this.$state.data[i],api:this.$props.props});
            }

            //Lazy Loading
            lazyload();
            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    }

    async getLife(){
        return await this.$props.props.getData("/api/content/life");
    }
    async getFood(){
        return await this.$props.props.getData("/api/content/food");
    }
    async getTrip(){
        return await this.$props.props.getData("/api/content/trip");
    }
    async getCulture(){
        return await this.$props.props.getData("/api/content/culture");
    }


    //Infinity Scrolling

    async LoadData(){
        const {link}=this.$props;
        let data,sliceData;
        switch(link){
            case '#Life':
                data = await this.getLife();
                sliceData=data.slice(this.$state.preItems,this.$state.items);
                this.setState({
                    data:[...this.$state.data,...sliceData],
                    preItems:this.$state.items,
                    items:this.$state.items+12,
                });
                break;
            case '#Food':
                data = await this.getFood();
                sliceData=data.slice(this.$state.preItems,this.$state.items);
                this.setState({
                    data:[...this.$state.data,...sliceData],
                    preItems:this.$state.items,
                    items:this.$state.items+12,
                });
                break;
            case '#Trip':
                data = await this.getTrip();
                sliceData=data.slice(this.$state.preItems,this.$state.items);
                this.setState({
                    data:[...this.$state.data,...sliceData],
                    preItems:this.$state.items,
                    items:this.$state.items+12,
                });
                break;
            case '#Culture':
                data = await this.getCulture();
                sliceData=data.slice(this.$state.preItems,this.$state.items);
                this.setState({
                    data:[...this.$state.data,...sliceData],
                    preItems:this.$state.items,
                    items:this.$state.items+12,
                });
                break;
            default:
                console.log(`No Search Page ${link}`);
                break;
        }

    }
    
    setEvent(){
        //Infinity Scroll
        const Throttle=throttling();
        let listener;
        
        window.addEventListener('scroll', listener=()=>{
            Throttle.throttle(()=>{
                if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    if(this.$state.preItems<40){
                        this.LoadData();
                    }
                    else{
                        window.removeEventListener('scroll',listener);
                    }
                }
            },500)
        })
    }
}