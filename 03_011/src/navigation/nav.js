import './nav.css';

const Navigation = () => {
  const parent = document.getElementById('navigation');
  const state = {
    title: ['홈', '라이프', '푸드', '여행', '컬쳐', '즐겨찾기'],
    path: ['', 'life', 'food', 'travel', 'culture', 'bookmark'],
  };

  const template = (list, index) => {
    const { path } = state;
    return `<li><a href="#${
      list === '홈' || list === '즐겨찾기'
        ? path[index]
        : `content/${path[index]}`
    }" />${list}</li>`;
  };

  const render = () => {
    const ul = document.createElement('ul');
    const { title } = state;
    title.forEach((name, index) => {
      ul.innerHTML += template(name, index);
    });

    parent.appendChild(ul);
  };

  render();
};

export default Navigation;
