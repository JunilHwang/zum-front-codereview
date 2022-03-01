const wire = () => {
    const wireHtml = `
    <h1 class="">글 쓰기</h1>
    <section>
        <form name="postFrom">
            <div>
                <label for="witer">작성자</label>
                <input id="witer" name="witer" type="text"/>
                <label for="title">제목</label>
                <input id="title" name="title" type="text"/>
            </div>
            <div>
                <textarea name="content"></textarea>
                <input id="submit" type="submit">
            </div>
        </form>
    </section>
    `;
   
    return wireHtml;
}

export default wire;