import { Component } from '@/core/Component';
import { Menu } from '@/components/Menu';
import { Card } from '@/components/Card';
import { $, bookmarkStorage } from '@/utils';
import '@/components/BookmarkPage/style.scss';

interface BookmarkPageProps {
  $target: Element;
}

function BookmarkPage({ $target }: BookmarkPageProps) {
  return Component.create({
    $target,

    template() {
      return `
        <header></header> 
        <main>
          <h3>즐겨찾기(최대 4개)</h3>
          <ul class="bookmark-list"></ul>
        </main>
      `;
    },

    mounted() {
      const bookmarks = bookmarkStorage.load();
      const $header = $('header')!;
      const $list = $('.bookmark-list')!;
      const $main = $('main')!;

      Menu({ $target: $header });
      bookmarks.forEach((bookmark) => Card({ $target: $list, ...bookmark, bookmarkable: false }));
    },
  });
}

export { BookmarkPage };
