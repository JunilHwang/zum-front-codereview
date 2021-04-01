import Component from "../core/component.js";
import Contents from "./Contents/contents.js";
import TopRank from "./Rank/topRank.js";

export default class MainPage extends Component{
    template(){
        return `
            <Contents data-component="Contents"></Contents>
            <TopRank data-component="TopRank"></TopRank>
        `
    }

    mount(){
        const $contents=this.$target.querySelector('[data-component="Contents"]');
        const $topRank=this.$target.querySelector('[data-component="TopRank"]');
        new Contents($contents,this.$props);
        new TopRank($topRank,this.$props);
    }

}