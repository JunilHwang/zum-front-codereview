import { createElement } from '@/core/dom';
import { RankingContent } from '@/types';
import { FunctionComponent } from '@/types/dom';
import rankingItemStyle from './rankingItem.module.scss';

interface RankingItemProps {
  rankingData: RankingContent;
  rank: number;
}

const { rankingItem, content, rankStyle, titleStyle, author } = rankingItemStyle;

export const RankingItem: FunctionComponent<RankingItemProps> = ({ rankingData, rank }) => {
  const { mediaName, title, url } = rankingData;
  return createElement(`
  <li class="${rankingItem}">
    <a href="${url}">
    <div class="${content}">
      <span class="${rankStyle}">${rank}</span>
      <span class="${titleStyle}">${title}</span>
    </div>
    <span class="${author}">
      <span>by</span>
      <span>${mediaName}</span>
    </span>
    </a>
  </li>`);
};
