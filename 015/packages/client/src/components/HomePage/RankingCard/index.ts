import { Component } from '@/core/Component';
import '@/components/HomePage/RankingCard/style.scss';

interface RankingCardProps {
  $target: Element;
  idx: number;
  mediaName: string;
  title: string;
  url: string;
  rank: number;
}

function RankingCard({ $target, idx, mediaName, title, url, rank }: RankingCardProps) {
  return Component.create({
    $target,

    template() {
      return `
        <li class="ranking-card" data-id="${idx}">
          <a href="${url}">
            <span class="rank">${rank}</span>
            <strong class="title">${title}</strong>
            <span class="author">by ${mediaName}</span>
          </a>
        </li>
      `;
    },

    render() {
      this.$target.innerHTML += this.template();
    },
  });
}

export { RankingCard };
