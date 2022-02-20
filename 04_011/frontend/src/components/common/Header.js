/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const Header = () => {
  return (
    <header>
      <div class="logo">
        <a href="#">Zum-Board</a>
      </div>
      <div class="rightBox">오른쪽박스</div>
    </header>
  );
};

export default Header;
