const Detail = ({ path, detail }) => {
  const { htmlData, idx } = detail;
  return `
  <section class="detailArticle">
    <div class="detailArticleWrapper articleWrapper" >
      <div>${htmlData}</div>  
      <div class="iconWrapper" id="${path}ID${idx}">
        <span class="pushCategory" data-route="${path}">목록</span>
        <span class="detailBookmark bookmark">
          <span>★</span>
          <span class="bookmarkText">즐겨찾기추가</span>
        </span>
      </div>
    </div>
  </section>
   `;
};

export default Detail;
