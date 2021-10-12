export default function Home({$app, initialState, onClick, addFavorite, io}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'home-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const rankTemplate = this.state.rank.map((rank, index) => {
            return `
                <div class="rank card-action" data-url="${rank.url}">
                    <p class="rank-number" style="font-style: oblique; padding-top: 10px; margin: 0; color: rgb(157, 157, 157); font-size: 20px;">${index + 1}</p>
                    <p class="rank-title" style="display: inline-block">${rank.title}</p>
                    <br/>
                    <span class="pre">by </span>   
                    <span class="rank-medium"> ${rank.mediaName}</span>
                </div>
            `
        }).join('')

        const lifeCardTemplate = this.state.life.map((life) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${life.url}">
                        <img data-src="${life.imageUrl}" class="card-image"/>
                        <h4 class="card-title">${life.title}</h4>
                        <span class="card-content"">${life.summaryContent}</span>
                    </div>
                    <span class="pre">by</span>
                    <span class="card-medium">${life.mediaName}</span>
                    <div class="favorite" data-id="${life.idx}" data-category="life"></div>
                </div>`
        }).join('')

        const foodCardTemplate = this.state.food.map((food) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${food.url}">
                        <img data-src="${food.imageUrl}" class="card-image"/>
                        <h4 class="card-title">${food.title}</h4>
                        <span class="card-content"">${food.summaryContent}</span>
                    </div>
                    <span class="pre">by</span>
                    <span class="card-medium">${food.mediaName}</span>
                    <div class="favorite" data-id="${food.idx}" data-category="food"></div>
                </div>`
        }).join('')

        const travelCardTemplate = this.state.travel.map((travel) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${travel.url}">
                        <img data-src="${travel.imageUrl}" class="card-image"/>
                        <h4 class="card-title">${travel.title}</h4>
                        <span class="card-content"">${travel.summaryContent}</span>
                    </div>
                    <span class="pre">by</span>
                    <span class="card-medium">${travel.mediaName}</span>
                    <div class="favorite" data-id="${travel.idx}" data-category="travel"></div>
                </div>`
        }).join('')

        const cultureCardTemplate = this.state.culture.map((culture) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${culture.url}">
                        <img data-src="${culture.imageUrl}" class="card-image"/>
                        <h4 class="card-title">${culture.title}</h4>
                        <span class="card-content"">${culture.summaryContent}</span>
                    </div>
                    <span class="pre">by</span>
                    <span class="card-medium">${culture.mediaName}</span>
                    <div class="favorite" data-id="${culture.idx}" data-category="culture"></div>
                </div>`
        }).join('')

        this.$target.innerHTML = `
            <h1>홈</h1>
            <div class="rank-container">
                ${rankTemplate}
            </div>
            <div class="card-conatiner">
                <h3 class="tag-title">#라이프</h3>
                ${lifeCardTemplate}
            </div>
            <div class="card-conatiner">
                <h3 class="tag-title">#푸드</h3>
                ${foodCardTemplate}
            </div>
            </div>
            <div class="card-conatiner">
                <h3 class="tag-title">#여행</h3>
                ${travelCardTemplate}
            </div>
            <div class="card-conatiner">
                <h3 class="tag-title">#문화</h3>
                ${cultureCardTemplate}
            </div>
        `

        const images = document.querySelectorAll('.card-image');
        images.forEach((image) => {this.io.observe(image);})
    }

    this.$target.addEventListener('click', (e) => {
        const $card = e.target.closest('.card-action')
        if ($card) {
            const cardUrl = $card.dataset.url
            if (cardUrl) {
                this.onClick(cardUrl)
            }
        }
        if (!e.target.closest('.favorite')) {
            return
        }
        const $selected = e.target.closest('.favorite')
        const selectedId = $selected.dataset.id
        const category = $selected.dataset.category

        const selectedCard = this.state[category].find(culture => culture.idx === parseInt(selectedId))
        if (selectedCard) {
            this.addFavorite(selectedCard)
        }
    })

    this.render()
}
