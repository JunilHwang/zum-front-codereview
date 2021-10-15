const baseUrl = 'http://localhost:4000';

export default {
  getAllContents: () => {
    return fetch(`${baseUrl}/contents`)
      .then(res => res.json())
      .then(json => json);
  },
  getCategoryContents: category => {
    return fetch(`${baseUrl}/contents/${category}`)
      .then(res => res.json())
      .then(json => json);
  },
};
