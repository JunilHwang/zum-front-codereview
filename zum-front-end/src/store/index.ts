import zumStore from "../lib/zum-store";

const store = new zumStore({
  state: {
    bookmark: [],
  },
  mutations: {
    bookmarker(data) {
      for (let i = 0; i < globalThis.$store.state.bookmark.length; i++) {
        if (globalThis.$store.state.bookmark[i].idx === data.idx) {
          let deleteArray = globalThis.$store.state.bookmark;
          deleteArray.splice(i, 1);
          store.state = { bookmark: deleteArray };
          return
        }
      }
      store.state = { bookmark: [...globalThis.$store.state.bookmark, data] };
    },
  },
});

export default store;
