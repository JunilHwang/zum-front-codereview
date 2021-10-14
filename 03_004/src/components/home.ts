import { API_URL } from "../config";
import { RankingContent } from "../types/types";
import gss from "../store/globalStateStore";
import PageComponent from "./pageComponent";


export default class Home extends PageComponent {

  async load(): Promise<any> {
    const response = await fetch(API_URL + 'best');
    if (response.ok) {
      const data: Array<RankingContent> = await response.json();
      gss.commit('updateBest', { data: data });
    } else {
      console.error('데이터 요청 실패..');
    }
  }

  template(): string {
    const best = gss.states.best;
    let homeTemplate = '<div id="home-page">'

    for (let i = 0; i < best.length; ++i) {
      homeTemplate += '<div>'
      homeTemplate += '<div>순위 : ' + (i+1) + '</div>';
      homeTemplate += '<div>타이틀 : ' + best[i].title + '</div>';
      homeTemplate += '<div>매체사 : ' + best[i].mediaName + '</div>';
      homeTemplate += '</div><br>'
    }

    homeTemplate += '</div>';

    return homeTemplate;
  }
}