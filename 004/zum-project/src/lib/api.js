const host = 'http://localhost:3000/api';
const api = {
    home: () => fetch(`${host}/best`),
    content: (category) =>
        fetch(`${host}/content/${encodeURIComponent(category)}`),
    detail: (url) => fetch(`${host}/detail/${encodeURIComponent(url)}`),
    favor: (idx) =>
        fetch(`${host}/favor?idx=${encodeURIComponent(JSON.stringify(idx))}`),
};
export default api;
