import Component from '../lib/Component.js';

export class PostListPage extends Component{
  
  constructor({ name, state }){
    super({ name, state })
    this.child = [] 
    this.child.push(new PostListHeader({ name : 'postlistheader', state }))
    this.child.push(new Postlist({ name : 'postlist' , state }))
    this.child.push(new PageButton({ name : 'pagebutton', state }))
  }
  
}

export class PostListHeader extends Component{
  
  child; 

  constructor({ name, state }){
    super({ name, state })
    this.child = []
    this.child.push( new Search({ name : 'search' , state }) )
    this.child.push( new Paging( { name :'paging', state  }) )
    this.child.push( new Sorting( { name : 'sorting', state }) )
    this.child.push( new SortButton( { name : 'sortbutton', state }) )

  }

}

export class Search extends Component{


   template(){
    const keyword = this.state.filter
    return `
    <div data-component="search" id="search">
      <input 
        data-action='searchInput' 
        placeholder="search" 
        type="text" 
        value=${keyword? keyword : ""}>
      <button data-action='searchBtn'>검색</button>
    </div>
  `;
  } 

}

export class Paging extends Component {


  template(){
    const select = Number(this.state.size)
    return `
      <div data-component=paging id="paging">
        <label for="pagination" value=${select}>페이지</label>
          <select data-action ="page">
          <option value=5 ${select === 5? "selected" : ""}>5</option>
          <option value=10 ${select === 10? "selected" : ""}>10</option>
          <option value=20 ${select === 20? "selected" : ""}>20</option>
        </select>
      </div>
    `;
  }

}

export class Sorting extends Component{


  template(){
    const selected = this.state.order
    return `
    <div data-component='sorting' id="sorting">
      <label for="sorting">날짜정렬</label>
      <select data-action="order">
        <option 
            name='order' value="dsc" 
            ${selected === 'dsc'? "selected" : ""}>최신</option>
        <option 
            name='order' value="asc"
            ${selected === 'asc'? "selected" : ""}>예전</option>
      </select>
    </div>`
    ;
  }

}

export class SortButton extends Component{

  template(){
    return `
      <div id="sortbutton">
        <button data-action = 'all' id="refreshall">초기화</button>
        <button data-action = 'page' id="refreshpage">새로고침</button>
      </div>
    `;
  }

}


export class Postlist extends Component{


  template(){
    
    const items = this.state.data
    const classOn = this.state.name !== '' ?`class='writer-on'` : "" 

    return `
    
      <div id='postlist'>
        <ul>
          <li>글번호</li>
          <li data-action='title'>제목</li>
          <li>작성자</li>
          <li>작성일</li>
        </ul>
        ${ items.length === 0 ? "" : 
          items.map( (item, idx) => `
          <ul data-index=${item.id}>  
            <li id= ${item.id}>${item.id}</li>
            <li data-action='title'>${item.title}</li>
            <li data-action='writer' ${classOn} >${item.writer}</li>
            <li>${item.date.split('T')[0]}</li>
          </ul>`)
          .join("")
        }
      </div>`
  }
}

class PageButton extends Component{

  constructor({ name, state }){
    super({ name, state });
    this.child = []; 
    this.child.push( new Pagination({ name :'pagination-button', state }) );
    this.child.push( new PostButton({ name :'postbutton', state }) );
  }

}

export class PostButton extends Component{

  template(){
    return `
      <div id=postbutton>
        <button>글 작성</button>
      </div>
    `
  }
  
}


export class Pagination extends Component{

  page; group

  template(){
    const { page, size, total, data } =  this.state;
    const less = Number(page) > 1;
    const more = Number(size)*Number(page) < Number(total) ;
    // console.log('postListPage============', this.state)

    return `
      <div id=pagination-button>
      ${ Number(total) === 0 ? `<span class="none-display">"게시글이 존재 하지 않습니다."</span>` : ""}
      ${ less ? `<button data-action="less">이전</button>` : "" }
      ${ more ? `<button data-action="more">더보기</button>` : "" }
      ${ Number(total) && !more ? `<span class="none-display">"마지막 페이지 입니다"</span>` : "" }
      </div>
    `
  }

}
