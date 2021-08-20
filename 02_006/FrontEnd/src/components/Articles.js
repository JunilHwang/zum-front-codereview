const Articles = (sectionTitle, dataList, sectionName) => {
  return `<section class="articleContainer clearfix">
        <h2>#${sectionTitle}</h2>
        <ul class="articleList">
        ${dataList
          .map(({ idx, imageUrl, title, summaryContent, mediaName, url }) => {
            url = url.replace('https://hub.zum.com/', '');
            return `
            <li class="articleItem" data-route='${sectionName}/${url}'>
              <article id="${sectionName}ID${idx}" class="articleCard">
                <img class="articleImg"src="${imageUrl}" alt="${title}"/>
                <h3 class="articleTitle">${title}</h3>
                <p>${summaryContent}</p>
                <span>by ${mediaName}</span>
                <span class="bookmark">
                  <span>★</span>
                  <span class="bookmarkText">즐겨찾기추가</span>
                </span>
            </article>
            </li>`;
          })
          .join('')}
          </ul>
      </section>`;
};
export default Articles;
