/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const submitButton = () => {
  return (
    <div id="submitButtonBlock">
      <button id="submitButton">작성</button>
    </div>
  );
};

export default submitButton;
