const header =async () => {
    const headetHtml = `
    <div class="total-board">
        <div class="board-name-1">
            <h3>게시판</h3>
            <subject>
            <ul>
                <li>글번호</li>
                <li>제목</li>
                <li>작성자</li>
                <li>작성일</li>
            </ul>
            </subject>
        </div>
    <div id="articles">
        
        
    </div>
    `;
    
    return headetHtml;
}

export default header;