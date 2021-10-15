const { getData, saveData } = require('./cache');
const getContentInformation = require('./crawler');

function detailTemplate(information, idx) {
  const { title, category, mediaName, details, imageUrl } = information;
  const categoryMap = new Map();
  [
    ['여행', 'travel'],
    ['라이프', 'life'],
    ['문화', 'culture'],
    ['푸드', 'food'],
  ].forEach(([title, tag]) => categoryMap.set(title, tag));

  const redirect = categoryMap.get(category)
    ? `http://localhost:1337/#content/${categoryMap.get(category)}`
    : 'http://localhost:1337/';

  return `<!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <title>zoom project - ${title}</title>
      <style type="text/css">
        .detail-content-container {
          width : 100%;
          height : 100%;
        }
        .detail-content-container ul {
          list-style : none;
          display : flex;
          flex-direction : column;
          justify-content : center;
          align-items : center;
        }
        .detail-page-title {
          font-size : 24px;
          margin-bottom : 10px;
        }
        .detail-page-image {
          width : 90%;
          display : flex;
          flex-wrap : wrap;
          row-gap : 10px;
          justify-content : center;
          column-gap : 24px;
          margin-top : 10px;
        }
        .image-container {
          width : 450px;
          height : 360px;
          background-position : center;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .detail-page-mediaName {
          color : #b2bec3;
        }
        .detail-page-contents {
          width : 80%;
          height : fit-content;
          line-height : 20px;
          white-space : pre-wrap;
          margin-top : 20px;
        }
        .detail-buttons-container {
          width : 100%;
          height : 20px;
          display : flex;
          justify-content : center;
          column-gap : 20px;
          margin-top : 40px;
        }
        .buttons {
          all : unset;
          border-bottom : 1px solid #333;
          cursor : pointer;
        }
        .buttons:hover {
          color : #74b9ff;
        }
      </style>
  </head>
  <body>
      <div class="detail-content-container">
        <ul>
            <li class="detail-page-title">${title}</li>
            <li class="detail-page-mediaName">by ${mediaName}</li>
            <li class="detail-page-image">
            ${imageUrl
              .map(
                (imgUrl) =>
                  `<div class="image-container" style="background-image : url(${imgUrl})"></div>`
              )
              .join('')}
              </li>
            <li class="detail-page-contents">${details}</li>
        </ul>
      </div>
      <div class="detail-buttons-container">
        <button class="buttons" id="category-list-button">목록</button>
        <button class="buttons" id="bookmark-button">즐겨찾기</button>
      </div>

      <script>
        const listBtn = document.getElementById('category-list-button');
        listBtn.addEventListener('click', () => {
            window.location.href = '${redirect}'
        });
        const bookmarkBtn = document.getElementById('bookmark-button');
        bookmarkBtn.addEventListener('click', () => {
          window.location.href = 'http://localhost:1337/#bookmark';
        });
      </script>
  </body>
  </html>`;
}

async function createDetailPage(idx, url) {
  if (getData(idx)) {
    return detailTemplate(getData(idx));
  }

  const result = await getContentInformation(url);
  const template = detailTemplate(result, idx);
  saveData(idx, result);
  return template;
}

module.exports = createDetailPage;
