import store from '../../lib/redux/store';

const Banner = () => {
  const { category } = store.getState();
  const data = category.trip.slice(15, 19);

  const Card = cardData => {
    const { idx, imageUrl, mediaName, title } = cardData;

    return `
      <li class="card" data-idx=${idx}>
        <img src="${imageUrl}" alt="thumbnail Image" />
        <div class="titleWrap">
          <span class="title">${title}</span>
          <span class="media">by ${mediaName}</span>
        </div>
      </li>
    `;
  };

  const renderBanner = () => {
    return `
      <section id="banner">
        <div class="banner_left">
          <div class="banner_left_top">
            ${Card(data[0])}
          </div>
          <div class="banner_left_bottom">
            ${Card(data[1])}
          </div>
        </div>
        <div class="banner_right">
          <div class="banner_right_top">
            ${Card(data[2])}
          </div>
          <div class="banner_right_bottom">
            ${Card(data[3])}
          </div>
        </div>
      </section>`;
  };

  return renderBanner();
};

export default Banner;
