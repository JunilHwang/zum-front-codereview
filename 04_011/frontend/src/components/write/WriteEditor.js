import SubmitButtonContainer from '../../containers/SubmitButtonContainer';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const WriteEditor = (Instance) => {
  return (
    <div id="writeEditorBlock" class="common">
      <div>
        <form>
          <input
            type="text"
            id="titleInput"
            name="titleInput"
            placeholder="제목을 입력하세요"
            minlength="0"
            maxlength="20"
          />
          <input
            type="text"
            id="authorInput"
            name="author"
            placeholder="작성자"
            minlength="0"
            maxlength="8"
          />
          <input
            type="text"
            id="editorInput"
            name="editor"
            placeholder="내용을 입력하세요"
            minlength="0"
            maxlength="100"
          />
        </form>
      </div>

      <div>{SubmitButtonContainer(Instance)}</div>
    </div>
  );
};

export default WriteEditor;
