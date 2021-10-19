import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import { ArticleCard } from '..';
import { getArticleRanking } from '@/apis';
import contentListStyle from './contentList.module.scss';
import { HubContent } from '@/types';

interface ContentListProps {
  sectionTitle: string;
  contentData: HubContent[];
}

const { contentList, sectionTitleStyle } = contentListStyle;

export const ContentList: FunctionComponent<ContentListProps> = ({ sectionTitle, contentData }) => {
  return createElement(
    `
  <section>
    <h2 class="${sectionTitleStyle}"># ${sectionTitle}</h2>
  </section>`,
    [
      createElement(
        `<ul class="${contentList}"></ul>`,
        contentData.map(({ idx, imageUrl, mediaName, summaryContent, title, url }) => {
          return ArticleCard({
            thumbnail: {
              src: imageUrl,
              alt: title,
            },
            title,
            idx,
            mediaName,
            url,
            description: summaryContent,
          });
        })
      ),
    ]
  );
};
