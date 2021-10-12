export default function Loading({$app, initialState}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = "loading"
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
        console.log(this.state)
    }

    this.render = () => {
        this.$target.innerHTML = `<div><p>Loading ...</p></div>`
        this.$target.style.display = this.state ? 'block' : 'none'
    }

    this.render()
}