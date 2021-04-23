import { fetchAllContents, fetchCategoryContents } from '../apis/fetchContentsAPI';

export const getTop4Items = async () => {
  const { data } = await fetchAllContents();
  const items = {};

  for (const category in data) {
    if (category === 'culture') {
      items['문화'] = data[category].slice(0, 4);
    }
    if (category === 'food') {
      items['음식'] = data[category].slice(0, 4);
    }
    if (category === 'life') {
      items['생활'] = data[category].slice(0, 4);
    }
    if (category === 'trip') {
      items['여행'] = data[category].slice(0, 4);
    }
  }

  return items;
};

export const getCategoryContents = async (category) => {
  const { data } = await fetchCategoryContents(category);
  return data;
};

export const getFavoriteItems = async () => {
  const favorites = localStorage.getItem('favorites');
  const favoriteItems = [];
  let items = [];

  if (!favorites) {
    return items;
  }

  const { data } = await fetchAllContents();

  for (const category in data) {
    items = [...items, ...data[category]];
  }

  JSON.parse(favorites).forEach((favoriteId) => {
    favoriteItems.push(
      items.find((item) => String(item.idx) === favoriteId),
    );
  });

  return favoriteItems;
};
