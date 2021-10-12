import {cultureRequest, foodRequest, lifeRequest, rankRequest, scrapRequest, travelRequest} from "./api";
import Home from "./Home.js";
import Life from "./Life.js";
import Food from "./Food";
import Travel from "./Travel";
import Culture from "./Culture";
import Detail from "./Detail";
import Loading from "./Loading";
import Favorite from "./Favorite";

const cache = {}

export default function App($app) {
    this.state = {
        isLoading: false,
        rankContent: [],
        lifeContent: [],
        foodContent: [],
        travelContent: [],
        cultureContent: [],
        selectedCardContent: [],
    }

    const routes = [
        {path: '', view: Home},
        {path: 'life', view: Life},
        {path: 'food', view: Food},
        {path: 'travel', view: Travel},
        {path: 'culture', view: Culture},
        {path: 'detail', view: Detail},
        {path: 'favorite', view: Favorite}
    ];

    window.onhashchange = () => {
        this.routes = routes;
        this.cur = window.location.hash.replace('#', '');
        const route = this.routes.find((route) => route.path === this.cur);
        const View = route.view;
        $app.innerHTML = ''
        sessionStorage.setItem('recentPath', this.cur)
        if (View === Home) {
            this.curState = {
                rank: this.state.rankContent,
                life: this.state.lifeContent.slice(0, 3),
                food: this.state.foodContent.slice(0, 3),
                travel: this.state.travelContent.slice(0, 3),
                culture: this.state.cultureContent.slice(0, 3),
            }
        } else if (View === Life) {
            this.curState = this.state.lifeContent
        } else if (View === Food) {
            this.curState = this.state.foodContent
        } else if (View === Travel) {
            this.curState = this.state.travelContent
        } else if (View === Culture) {
            this.curState = this.state.cultureContent
        } else if (View === Detail) {
            this.curState = this.state.selectedCardContent
        } else if (View === Favorite) {
            this.curState = JSON.parse(localStorage.getItem('favorite'))
        }
        sessionStorage.setItem('recentState', JSON.stringify(this.curState))
        new View({
            $app,
            initialState: this.curState,
            onClick: this.onClick,
            addFavorite: this.addFavorite,
            io: this.io,
            createTemplate: this.createTemplate
        });
    };

    const loading = new Loading({$app, initialState: this.state.isLoading})

    this.setState = (nextState) => {
        this.state = nextState
        loading.setState(this.state.isLoading)
    }

    this.onClick = async (cardUrl) => {
        cardUrl = cardUrl.replace('https://hub.zum.com/', '').split('/')
        if (cache[cardUrl]) {
            this.setState({
                ...this.state,
                selectedCardContent: cache[cardUrl]
            })
        } else {
            try {
                this.setState({
                    ...this.state,
                    isLoading: true,
                })
                const scrap = await scrapRequest(cardUrl[0], cardUrl[1])
                this.setState({
                    ...this.state,
                    selectedCardContent: scrap
                })
                cache[cardUrl] = scrap
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
            } catch (e) {
                throw new Error(e.message)
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            }
        }
        location.href = '#detail'
    }

    this.addFavorite = async (card) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if (favorite) {
            const favoriteInLocal = favorite.find(e => e.idx === card.idx)
            if (favoriteInLocal) {
                alert("이미 즐겨찾기 목록에 존재합니다.")
                return
            } else {
                favorite.unshift(card)
            }
        } else {
            favorite = [card]
        }
        localStorage.setItem('favorite', JSON.stringify(favorite))
        alert("즐겨찾기 목록에 추가되었습니다.")
        // localStorage.clear()
    }

    this.io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        })
    }, {threshold: 1})

    this.createTemplate = (item) => {
        return `
            <div class="card-container">
                <div class="card-action" data-url="${item.url}">
                    <img data-src="${item.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${item.title}</h5>
                    <span class="card-content"">${item.summaryContent}</span>
                </div>
                <span class="card-medium">By ${item.mediaName}</span>
                <div class="favorite" data-id="${item.idx}" ></div>
            </div>
        `
    }

    const init = async () => {
        try {
            this.setState({
                ...this.state,
                isLoading: true,
            })
            const Life = await lifeRequest()
            const Food = await foodRequest()
            const Travel = await travelRequest()
            const Culture = await cultureRequest()
            const Rank = await rankRequest()
            this.setState({
                ...this.state,
                lifeContent: Life,
                foodContent: Food,
                travelContent: Travel,
                cultureContent: Culture,
                rankContent: Rank,
            })
        } catch (e) {
            throw new Error(e.message)
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }
    init()

    this.render = () => {
        this.routes = routes;
        const path = sessionStorage.getItem('recentPath')
        console.log(path)
        if (path === null) {
             $app.innerHTML = `
                <div class="screen">
                    <h1>Zum assignment</h1>
                    <h2>지원자 최민호입니다!</h2>
                    <h2>줌 인터넷 과제 테스트 웹 페이지 입니다.</h2>
                    <h3>위에있는 메뉴를 통해 기능을 보실 수 있습니다!</h3>
                    <h3>평가 감사합니다!</h3>
                </div>
            `
        }
        const recentState = sessionStorage.getItem('recentState')
        const route = this.routes.find((route) => route.path === path);
        const View = route.view;
        new View({
            $app,
            initialState: JSON.parse(recentState),
            onClick: this.onClick,
            addFavorite: this.addFavorite,
            io: this.io,
            createTemplate: this.createTemplate
        })
    }
    this.render()
}