const Notfound = ({ parent }) => {
  const render = () => {
    parent.innerHTML =
      '<div>페이지를 찾을 수 없습니다. <button><a href="#" />홈으로 이동</button></div>';
  };

  render();
};

export default Notfound;
