export default function Detail({$app, initialState, addFavorite, io}) {
    this.state = initialState
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'detail-card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const imageContent = this.state.image.map((i) => {
            if (i.startsWith('http')) {
                return `<img data-src="${i}" width="80%" class="detail-image"/>`
            }
        }).join('')

        const textContent = this.state.content.map((t) =>
            `<p class="detail-text">${t}</p>`
        ).join('')

        const detailTemplate = `
            <p class="category">${this.state.category}</p>
            <p class="title">${this.state.title}</p>
            <span class="pre">by </span><span class="medium"> ${this.state.mediaName.slice(2)}</span>
            <span class="date"> ${this.state.date}</span>
            <div class="image-container">
                ${imageContent}
            </div>
            ${textContent}                        
            <button class="inven-btn" onclick="history.back()" >목록</button>
            <div class="favorite"></div>
        `
        this.$target.innerHTML = `<div>${detailTemplate}</div>`

        const images = document.querySelectorAll('.detail-image');
        images.forEach((image) => {
            this.io.observe(image);
        })
    }
    this.$target.addEventListener('click', (e) => {
        if (e.target.closest('.favorite')) {
            const target = {
                idx: parseInt(this.state.idx),
                title: this.state.title,
                mediaName: this.state.mediaName.slice(2),
                summaryContent: this.state.content.join(''),
                imageUrl: this.state.image[0],
                url: this.state.url,
            }
            this.addFavorite(target)
        }
    })

    this.render()

}