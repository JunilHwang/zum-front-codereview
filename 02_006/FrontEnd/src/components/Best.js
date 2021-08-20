const Best = ({ best }) => {
  const dataList = [...best];
  return `<section class="container best">
            <h2>실시간 TOP 12</h2>    
            <div>
                <ul class="clearfix bestList">
                    ${dataList
                      .map(({ idx, mediaName, title, url }, i) => {
                        url = url.replace('https://hub.zum.com/', '');
                        return `<li class="bestItem" data-route='${url}'>
                                    <span>${i + 1}</span>
                                    <article id="${idx}"class="bestArticle">
                                                <h4 class="a11yHidden">랭킹${i + 1}위 기사</h4>
                                                <p>${title}</p>
                                                <span>by ${mediaName}</span>
                                    </article>
                                </li>
                                `;
                      })
                      .join('')}
                </ul>
        </div>
    </section>
      `;
};
export default Best;
