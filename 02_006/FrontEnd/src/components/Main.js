import Articles from './Articles.js';

const Main = ({ main }) => {
  //1,라이프
  //2.푸드
  //3.여행
  //4.컬쳐

  let mainState = main;
  let sectionName = {
    라이프: 'life',
    푸드: 'food',
    여행: 'trip',
    컬쳐: 'culture',
  };

  const render = sectionName => {
    const title = Object.keys(sectionName);
    return `<main class="main">
      <div class="container">
          ${title
            .map(title => {
              let section = sectionName[title];
              return Articles(title, mainState[section], section);
            })
            .join('')}
      </div>
    </main>
    `;
  };

  return render(sectionName);
};
export default Main;
