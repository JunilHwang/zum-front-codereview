class Api {
  BASE_URL = 'http://localhost:8888'
  TIME_OUT = 5000

  showLoading() {
    document.querySelector('[data-loading]').classList.add('loading')
  }

  hideLoading() {
    document.querySelector('[data-loading]').classList.remove('loading')
  }

  async call(url) {
    this.showLoading()
    const controller = new AbortController()
    const t = setTimeout(() => {
      controller.abort()
      this.hideLoading()
    }, this.TIME_OUT)

    const response = await fetch(`${this.BASE_URL}${url}`, { signal: controller.signal })
    const data = await response.json()

    clearTimeout(t)

    if (response.ok) {
      this.hideLoading()
      return data
    } else {
      this.hideLoading()
      throw Error(data)
    }
  }
}

const api = new Api()

export { api }