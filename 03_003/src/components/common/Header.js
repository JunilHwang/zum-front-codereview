import store from '../../lib/redux/store';

import logo from '../../assets/img/logo.png';

const Header = () => {
  const categories = ['HOME', '라이프', '푸드', '여행', '컬처'];
  const categoryLink = {
    HOME: '',
    라이프: 'life',
    푸드: 'food',
    여행: 'trip',
    컬처: 'culture',
  };

  let hash = location.hash.replace('#', '');
  if (hash.includes('detail')) {
    const { detail } = store.getState();
    hash = categoryLink[detail.category];
  }

  const renderHeader = () => {
    return `
      <header>
        <div class="headerTop">
          <a href="#"><img src="${logo}" class="logo" alt="zum hub logo" /></a>
          <span class="bookmark">
            <a href="#bookmark">
              <i class="far fa-bookmark"></i>즐겨찾기
            </a>
          </span>
        </div>
        <nav>
        <ul class="categoryList">
            ${categories
              .map(category => {
                return categoryLink[category] === hash
                  ? `
                  <li class="category selected">
                    <a href="#${categoryLink[category]}">
                      ${category}
                    </a>
                  </li>`
                  : `
                  <li class="category">
                    <a href="#${categoryLink[category]}">
                      ${category}
                    </a>
                  </li>`;
              })
              .join('')}
          </ul>
        </nav>
      </header>
  `;
  };

  return renderHeader();
};

export default Header;
