import { Component } from '@/core/Component';
import { useStore } from '@/core/Store';
import { Card, HubContent } from '@/components/Card';
import { getMainContents } from '@/api';
import { $ } from '@/utils';
import { withBookmarkEvent } from '@/components/BookmarkPage/withBookmarkEvent';
import { actionTypes } from '@/reducer';
import '@/components/HomePage/MainContents/style.scss';

interface MainContentsProps {
  $target: Element;
}

function MainContents({ $target }: MainContentsProps) {
  return Component.create(
    withBookmarkEvent({
      $target,
      store: useStore(),

      template() {
        const { isLoading, isError } = this.state;
        let message = '';

        if (isLoading) message = '로딩 중...';
        if (isError) message = '메인 컨텐츠를 불러오는 중 에러가 발생했습니다.';

        return `
        ${message}
        <ul class="life-main-list main-contents-list"></ul>
        <ul class="food-main-list main-contents-list"></ul>
        <ul class="trip-main-list main-contents-list"></ul>
        <ul class="culture-main-list main-contents-list"></ul>
      `;
      },

      async willMount() {
        try {
          this.setState({ isLoading: true, isError: false });

          this.store.dispatch({ type: actionTypes.ADD_COUNT });
          const [life, food, trip, culture] = await getMainContents();

          this.setState({ life, food, trip, culture, isLoading: false });
        } catch (err) {
          console.error(err);
          this.setState({ isLoading: false, isError: true });
        }
      },

      render() {
        const { life, food, trip, culture, isLoading, isError } = this.state;

        this.$target.innerHTML = this.template();

        if (isLoading || isError) return;

        const $lifeList = $('.life-main-list')!;
        const $foodList = $('.food-main-list')!;
        const $tripList = $('.trip-main-list')!;
        const $cultureList = $('.culture-main-list')!;

        life.map((listData: HubContent) => Card({ $target: $lifeList, ...listData }));
        food.map((listData: HubContent) => Card({ $target: $foodList, ...listData }));
        trip.map((listData: HubContent) => Card({ $target: $tripList, ...listData }));
        culture.map((listData: HubContent) => Card({ $target: $cultureList, ...listData }));
      },
    }),
  );
}

export { MainContents };
