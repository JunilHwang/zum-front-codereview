import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import articleCardStyle from './articleCard.module.scss';

interface ArticleCardProps {
  thumbnail: { src: string; alt: string };
  title: string;
  mediaName: string;
  idx: number;
  url: string;
  description: string;
}

const { articleCard, thumbnail, content, titleStyle, descriptionStyle, mediaNameStyle } =
  articleCardStyle;

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  thumbnail: { src, alt },
  title,
  mediaName,
  idx,
  url,
  description,
}) => {
  const middleIdx = Math.floor(title.length / 2);
  const middleLetter = title[middleIdx];
  const isEmpty = middleLetter !== ' ';
  const titleFirstLine = title.slice(0, isEmpty ? middleIdx + 1 : middleIdx);
  const titleSecondLine = title.slice(isEmpty ? middleIdx + 1 : middleIdx);

  return createElement(`
    <li class="${articleCard}">
      <a href="${url}">
        <img src="${src}" alt="${alt}" class="${thumbnail}" />
        <div class="${content}">
          <div class="${titleStyle}">
            <span>${titleFirstLine}</span>
            <span class="whiteSpace">${titleSecondLine}</span>
          </div>
          <div>
            <span class="${descriptionStyle}">${description}</span>
          </div>
          <div>
            <span class="${mediaNameStyle}">by. ${mediaName}</span>
          </div>
        </div>
      </a>
    </li>`);
};
