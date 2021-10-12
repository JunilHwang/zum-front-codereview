export default function Food({$app, initialState, onClick, addFavorite, io, createTemplate}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.createTemplate = createTemplate
    this.$target = document.createElement('div')
    this.$target.className = 'page-container'
    $app.appendChild(this.$target)
    let count = 12

    let cardTemplate = this.state.slice(0, 12).map((food) => {
        return `
                <div class="card-container">
                    <div class="card-action" data-url="${food.url}">
                        <img data-src="${food.imageUrl}" class="card-image"/>
                        <h4 class="card-title">${food.title}</h4>
                        <span class="card-content"">${food.summaryContent}</span>
                    </div>
                    <span class="pre">by</span>
                    <span class="card-medium">${food.mediaName}</span>
                    <div class="favorite" data-id="${food.idx}"></div>
                </div>`
    }).join('')


    this.render = () => {
        this.$target.innerHTML = `
            <h1>푸드</h1>
            ${cardTemplate}
        `

        const images = document.querySelectorAll('.card-image');
        images.forEach((image) => {
            this.io.observe(image);
        })

        const cards = document.querySelector('.page-container .card-container:last-child')
        const is = new IntersectionObserver((entry, observer) => {
            const ioTarget = entry[0].target
            if (entry[0].isIntersecting) {
                is.unobserve(ioTarget);
                cardTemplate += this.createTemplate(this.state[count++])
                this.render()
            }
        }, {
            threshold: 1
        });
        is.observe(cards)
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
        const selectedCard = this.state.find(culture => culture.idx === parseInt(selectedId))
        if (selectedCard) {
            this.addFavorite(selectedCard)
        }
    })

    this.render()
}
