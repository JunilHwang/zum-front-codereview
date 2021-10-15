import app from './view/app';
import best from './view/best';
import section from './view/section';
import registry from './registry';
import { getBest, getCategory, RankingContent, HubContent } from './getData';
import createRouter from './router'
import createPages from './pages'
import detail from './view/detail';

export interface State {
	bestContents: RankingContent[]
	category: {
		life:HubContent[]
		food:HubContent[]
		trip:HubContent[]
		culture:HubContent[]
		favorite:HubContent[]
	}
	detail: HubContent
}

export const state: State = {
	bestContents: [],
	category: {
		life: [],
		food: [],
		trip: [],
		culture: [],
		favorite: []
	},
	detail: {
		idx: 75576,
		title: "신동엽도 단골, 외국인까지 줄서서 먹는다는 칼국수 맛집",
		imageUrl:
			"https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/11/1087f8a014364eecb6523f6e2ea09078_640x480c.jpg",
		mediaName: "밥심",
		url: "https://hub.zum.com/singleliving/75576",
		summaryContent:
			"날씨가 완전히 풀리기 전 열심히 먹어야 할 메뉴가 있어요! 바로 칼국수인데요ㅎㅎ 입김을 뿜어가며 호호 불어 먹는 칼국수의 맛이란..♥ 시원한 냉면에게 자리를 내어주기 전 꼭 먹어봐야 할 칼국수 맛집을 소개해 드릴게요! 오늘은 특별히 미식가로 유명한 연예인분들의 인증 맛집으로 가져왔습니다ㅎㅎ 가보실까요~? 경기 하남시 검단산로 348 10:30 – 23:59",
	}
};

const events = {
	addFavorite: (content: HubContent) => {
		state.category.favorite.push(content)
	},

	deleteFavorite: (idx: number) => {
		state.category.favorite = state.category.favorite.filter(cnt => {
			return cnt.idx !== idx
		})
	},

	updateDetail: (content: HubContent) => {
		state.detail = content
	}
}

registry.add('app', app);
registry.add('best', best);
registry.add('section', section);
registry.add('detail', detail);

const pages = createPages();
export const router = createRouter();

router
  .addRoute('/', pages.home)
	.addRoute('/:category', pages.category)
	.addRoute('/:category/:idx', pages.detail)
  .start();

export const render = (main: HTMLElement) => {
	window.requestAnimationFrame(() => {
		const newMain = registry.renderRoot(main, state , events);
		main.replaceWith(newMain);
	})
}

// initiate
(async () => {
	const life = await getCategory('life');
	const food = await getCategory('food');
	const trip = await getCategory('trip');
	const culture = await getCategory('culture');

	state.category['life'] = life
	state.category['food'] = food
	state.category['trip'] = trip
	state.category['culture'] = culture

	const best = await getBest();
	state.bestContents = [...best]

	const main = window.document.getElementById('root');
	render(main);
})();

const main = window.document.getElementById('root');
render(main);

