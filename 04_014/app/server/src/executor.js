let tem = require('./Data.js')
let totData = tem; 

let initialState = {
  data : totData.slice().reverse().slice(0,5),
  page : 1,
  size : 5, 
  order : 'dsc',
  filter : '',
  name : '',
  total : totData.length,
  index : 0
}

// ---- Query executor ---- 
const queryExecutor = {

  // SELECT * FROM _ WHERE all culumn LIKE '%keyword%' 
  filterByKeyWord : (keyword, data=totData) => {
    // filter by search keyworkd
    // console.log("datata", data)
    return keyword === "" 
    ? data 
    : data.filter( ele =>{
        let bool = false 
        for(let [ key,val ] of Object.entries(ele)){
          if(key === 'id' || key ==='date' || key === 'index') continue
          // console.log( val, keyword)
          if(!String(val).includes(keyword)) continue 
          bool = true 
          // console.log(ele) 
          break
        }
        return bool
    })
  },

  // SELECT * FROM _ WHERE writer = name
  filterByName : (name, data) => {
    // filter by writer name
    // console.log("datata", data)

    return  name === "" 
    ? data 
    : data.filter( ele =>{
        let bool = false 
        for(let [ key,val ] of Object.entries(ele)){
          if(key === 'writer' && String(val) === name ){
            bool = true
            break
          }
        }
        return bool
    })
  },

  // LIMIT & OFFSET 
  setRange : (page, size, offset, end) => {
    // set view data range  
    let _from = (page - 1) * size - offset; 
    _from = _from < 0 ? 0 : _from; 

    let _to = _from + size + offset;
    _to = _to >= end ? end : _to; 
    // console.log(page, size, _from, _to)
    return [_from, _to, end] 
  },
  
  // ORDER BY & INDEX
  setIndexData : (order, _data) => {
    _data = order === 'dsc' ? _data.reverse() : _data
    
    return _data.slice()
      .map((item, idx) => {
      item['index'] = idx
      return item
    })
  }
}
module.exports = {
  updateStateByQueryExecutor  : (state) =>{
    let{ filter, name, order, page, size, data, total } = state 
  
    page = Number(page); size= Number(size);
    // console.log("executor=", page, size, filter, name, order, data)
    let filtered = queryExecutor.filterByKeyWord(filter);
    // console.log(filtered)
    
    filtered = queryExecutor.filterByName(name, filtered);
    // console.log(filtered)
    
    let [ from, to ] = queryExecutor.setRange(page, size, 0, filtered.length);
  
    let totFilterData = queryExecutor.setIndexData(order, filtered.slice());
    data = totFilterData.slice(from, to);
    total = totFilterData.length; 
  
    state = { ...state, data, total }
    // console.log(state)
    return state 
  },
  getPathURL : (state) => {
    const { filter, name, order, data, total, page, size } = state
    const id = `filter=${filter}&name=${name}&order=${order}&page=${page}&size=${size}`
    
    return id
  },

  updatePost : ( { writer, title , content, id } )=>{
    // console.log("id===========", id)
    totData = totData.map( ele => {

      if( Number(ele.id) === Number(id) ) {
        ele.writer = writer; 
        ele.title = title
        ele.content = content;
      }
      return ele
    })
    // console.log(totData[ totData.length-1 ])
    return totData 
  },

  createPost : ( { writer, title, content } ) =>{
    const id = totData[totData.length -1].id + 1;
    totData.push({
      id, writer, title, content, date: new Date().toISOString()
    })
    return totData
  },

  deletePost : ( id ) => {
    for(let i = 0 ; i < totData.length ; i++){
      if( totData[i].id === Number(id) ) totData.splice(i,1);
    }
    return totData;
  }
  ,
  getInitialState : () => {
    initialState.data = totData.slice().reverse().slice(0,5)
    return initialState
  }

}
