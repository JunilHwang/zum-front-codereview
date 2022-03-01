const edit = async (id) => {
    let editHtml = ""
    
    const getData = async (id) => {
        const res = await fetch(`http://localhost:1010/oneBoardData/${id}`,{
            headers: {
                'Accept': 'application/json'
            },
        })
        .then((res)=> {
            return res.json()
        }).then((data) => {            
            return data;
        }).catch(error => console.log(error));

        return res;
    }

    const data = await getData(id);

    if(data?.length > 0) {
        const detailData = data[0];
        editHtml = `
        <h1 class="">글 쓰기</h1>
        <section>
            <form name="editFrom">
                <div>
                    <label for="id">글번호</label>
                    <input id="id" name="id" type="text" value="${detailData.id}" disabled/>
                    <label for="witer">작성자</label>
                    <input id="witer" name="witer" type="text" value="${detailData.Writer}"/>
                    <label for="title">제목</label>
                    <input id="title" name="title" type="text" value="${detailData.title}"/>
                </div>
                <div>
                    <textarea name="content">${detailData.content}</textarea>
                    <input id="editButtonSubmit" type="submit">
                </div>
            </form>
        </section>
        `;
    }
    return editHtml;
}

export default edit;