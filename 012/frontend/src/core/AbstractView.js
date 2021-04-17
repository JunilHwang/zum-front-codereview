export default class AbstractView {
  state;
  constructor() {
    this.state;
  }
  async getData(url) {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.state = data;
      });
  }

  render() {
    let cardList = document.createElement("ul");
    cardList.classList.add("card__list");
    let cards = this.state.map((card) => {
      return `<li class="card__item" >
        <a href="${location.pathname}/${card.idx}" class="detail__link">
          <img class="card__thumbnail" src="${card.imageUrl}" alt="${card.idx}"/>
          <h2 class="card__title">${card.title}</h2>
          <span class="card__media__name">${card.mediaName}</span>
        </a>
      </li>`;
      this.setEvent(card.url);
    });

    cardList.insertAdjacentHTML("afterbegin", cards.join(" "));
    document
      .querySelector("#app")
      .insertAdjacentElement("afterbegin", cardList);
  }

  setEvent(url) {
    let detailLink = document.querySelector("detail__link");
    detailLink.addEventListener("click", (e) => {
      fetch(`/api/detail/${url}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.state = data;
        });
    });
  }
}
