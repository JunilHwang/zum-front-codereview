const BOOKMARK_STORAGE_KEY = 'bookmarkedIds';

function saveBookmarkInLocalStorage(arr) {
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(arr));
}

function getBookmarkFromLocalStorage() {
  const getItems = localStorage.getItem(BOOKMARK_STORAGE_KEY);
  return getItems ? JSON.parse(getItems) : null;
}

export {
  BOOKMARK_STORAGE_KEY,
  saveBookmarkInLocalStorage,
  getBookmarkFromLocalStorage,
};
