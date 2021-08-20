const SubPage = ({ sub, path }) => {
  const subData = sub[path];
  const subPageRender = (dataList, path) => {
    const title = {
      bookmark: '즐겨찾기',
      life: '라이프',
      food: '푸드',
      trip: '여행',
      culture: '컬쳐',
    };
    dataList = dataList.length ? dataList : '';
    return `
    <div class="sub">
      <h2 id="subPage" class="subLogo">${title[path]}</h2>
      <div class="container ${!dataList && 'textCenter'}">
        <section aria-labelledby="subPage">
          <h3 class="a11yHidden">${title[path]} 기사</h3>
          <ul class="clearfix articleList article2List">
            ${
              dataList
                ? dataList
                    .map(({ idx, imageUrl, title, summaryContent, mediaName, url }) => {
                      url = url.replace('https://hub.zum.com/', '');
                      return `
                    <li class="articleItem2" data-route="${path}/${url}">
                      <article class="articleCard" id="${path}ID${idx}">
                        <img class="articleImg"src="${imageUrl}" alt="${title}"/>
                        <h3 class="articleTitle">${title}</h3>
                        <p>${summaryContent}</p>
                        <span>by${mediaName}</span>
                        <span class="bookmark">
                          <span>★</span>
                          <span class="bookmarkText">즐겨찾기추가</span>
                          </span>

                      </article>
                    </li>`;
                    })
                    .join('')
                : '<li>즐겨찾기 목록이 없습니다.</li>'
            }
          </ul>
        </section>
        </div>
    </div>
      `;
  };

  return subPageRender(subData, path);
};

export default SubPage;
