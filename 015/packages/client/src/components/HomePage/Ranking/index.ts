import { Component } from '@/core/Component';
import { useStore } from '@/core/Store';
import { RankingCard } from '@/components/HomePage/RankingCard';
import { getRanking } from '@/api';
import { $ } from '@/utils';
import { actionTypes } from '@/reducer';
import '@/components/HomePage/Ranking/style.scss';

interface RankingProps {
  $target: Element;
}

interface RankingListItem {
  idx: number;
  mediaName: string;
  title: string;
  url: string;
}

function Ranking({ $target }: RankingProps) {
  return Component.create({
    $target,
    store: useStore(),

    template() {
      const { isLoading, isError } = this.state;

      if (isLoading) return `로딩 중 ...`;

      if (isError) return `실시간 TOP 12를 불러오는 중 에러 발생했습니다.`;

      return `
        <div class="ranking-title">실시간 TOP 12</div>
        <ul class="ranking-list"></ul>
      `;
    },

    async willMount() {
      try {
        this.setState({ rankingList: [], isLoading: true, isError: false });

        this.store.dispatch({ type: actionTypes.ADD_COUNT });
        const list = await getRanking();

        this.setState({ rankingList: list, isLoading: false });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false, isError: true });
      }
    },

    render() {
      const { rankingList, isLoading, isError } = this.state;

      this.$target.innerHTML = this.template();

      if (isLoading || isError) return;

      const $ul = $('.ranking-list')!;

      rankingList.map(({ idx, mediaName, title, url }: RankingListItem, index: number) => {
        RankingCard({ $target: $ul, idx, mediaName, title, url, rank: index + 1 });
      });
    },
  });
}

export { Ranking };
