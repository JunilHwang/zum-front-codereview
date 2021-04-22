import { Component } from '@/core/Component';
import { Card, HubContent } from '@/components/Card';
import { $, $$ } from '@/utils';
import { withBookmarkEvent } from '@/components/BookmarkPage/withBookmarkEvent';
import '@/components/SubPage/CardList/style.scss';

interface CardListProps {
  $target: Element;
  list: HubContent[];
  isLoading?: boolean;
  isError?: boolean;
  onScroll: any;
}

function CardList({ $target, list, isLoading = false, isError = false, onScroll }: CardListProps) {
  return Component.create(
    withBookmarkEvent({
      $target,

      template() {
        let message = '';

        if (isLoading) message = '로딩 중 ...';
        if (isError) message = '에러 발생';

        return `<ul class="card-list">${message}</ul>`;
      },

      mounted() {
        if (isLoading || isError) return;

        this.appendCard(list);
      },

      appendCard(list: HubContent[]) {
        const $ul = $('.card-list')!;
        list.forEach((card) => Card({ $target: $ul, ...card }));
        this.addIntersectionObserver();
      },

      addIntersectionObserver() {
        const [target] = Array.from($$('.card')).slice(-1);

        if (!target) return;

        const observer = new IntersectionObserver(
          (entries, observer) => {
            const [entry] = entries;

            if (!entry?.isIntersecting) return;

            observer.disconnect();
            onScroll();
          },
          { threshold: 1 },
        );

        observer.observe(target);
      },
    }),
  );
}

export { CardList };
