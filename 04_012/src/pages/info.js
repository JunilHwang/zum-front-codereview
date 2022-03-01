const info = async (id) => {    
    let detailHtml = "";

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
        detailHtml = `
        <h1 class="con">게시글 상세</h1>        
        <section>
            <div class="header">
                <span>글번호: ${detailData.id}</span></br></br>
                <span>제목: ${detailData.title}</span></br></br>
                <span>작성자: ${detailData.Writer}</span></br></br>
                <span>작성일: ${detailData.date}</span></br></br></br>
            </div>
            <div class="content">
                <p>${detailData.content}</p>
            </div>
            </br></br></br>
            <div>
                <span id="editPost">수정</span>&nbsp;&nbsp;&nbsp;<span id="delPost">삭제</span>&nbsp;&nbsp;&nbsp;<span id="goList">목록</span>
            </div>
        </section>
        `
    }
    return detailHtml;
}

export default info;