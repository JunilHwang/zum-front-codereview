export default function Favorite({$app, initialState, onClick, io}) {
    this.state = initialState
    this.onClick = onClick
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'favorite-card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state ? this.state.map((favorite) => {
            return `
                <div class="favorite-card" data-url="${favorite.url}">
                    <div class="favorite-card-title">
                        <h4 class=""">${favorite.title}</h5>
                        <span class="pre">by </span><span class="favorite-card-medium"> ${favorite.mediaName} </span>
                    </div>
                    <div class="favorite-card-content">
                        <p>${favorite.summaryContent}</p>
                    </div>
                    <div class="favorite-card-image">
                        <img data-src="${favorite.imageUrl}" width="280px" height="200px" class="card-image"/> 
                    </div>
                </div>`
        }).join('') : `<p>즐겨찾기 목록이 존재하지 않습니다.</p>`

        this.$target.innerHTML = `
            <h1>즐겨찾기</h1>
            ${cardTemplate}
        `

        const images = document.querySelectorAll('.card-image');
        images.forEach((image) => {this.io.observe(image);})
    }

    this.$target.addEventListener('click', (e)=>{
        const $card = e.target.closest('.favorite-card')
        if ($card) {
            const cardUrl = $card.dataset.url
            if (cardUrl) {
                this.onClick(cardUrl)
            }
        }
    })

    this.render()
}