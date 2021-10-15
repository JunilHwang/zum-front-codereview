import ContentCard from './ContentCard';

const ContentList = (contents, renderNum) => {
  return `
    <div class="content-list-wrapper">
      ${contents
        .map(
          ({ idx, title, imageUrl, mediaName, url, summaryContent }, index) =>
            renderNum > index
              ? `
        <div class="content-wrapper" data-key="${idx}">
          ${ContentCard(title, imageUrl, mediaName, summaryContent)}
        </div>
      `
              : '',
        )
        .join('')}
    </div>
  `;
};

export default ContentList;
