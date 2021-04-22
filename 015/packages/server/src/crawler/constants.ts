const zumUrl = {
  base: 'https://hub.zum.com',
  life: '/life',
  food: '/food',
  trip: '/trip',
  culture: '/culture',
};

const selectors = {
  ranking: '.rt_top_box > ul a',
  content: '#item_list .item',
  detail: {
    title: '.main_title',
    media: '#btn_media',
    body: '.article_body div',
  },
};

export { zumUrl, selectors };
