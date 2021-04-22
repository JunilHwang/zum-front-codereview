import { $, bookmarkStorage } from '@/utils';

const withBookmarkEvent = (component: any) => {
  return {
    ...component,

    handleBookmarkClick(e: Event) {
      const target = e.target as Element | null;

      if (!target?.classList.contains('bookmark-btn')) return;

      const $li = target.parentElement!;

      const { id: idx, medianame: mediaName } = $li.dataset;
      const title = $('.title', $li)!.textContent!;
      const summaryContent = $('.text', $li)!.textContent!;
      const url = $('a', $li)!.getAttribute('href')!;
      const imageUrl = $('img', $li)!.getAttribute('src')!;

      const addResult = bookmarkStorage.add({ idx: +idx!, mediaName: mediaName!, title, summaryContent, url, imageUrl });

      alert(addResult ? '즐겨찾기에 추가되었습니다.' : '이미 즐겨찾기에 있습니다.');
    },

    addEvent() {
      const $target = this.$target as Element;
      $target.addEventListener('click', this.handleBookmarkClick);
    },
  };
};

export { withBookmarkEvent };
