export const actionHandler = {
  state : "", 
  cacheHandler : {

    setCache (){
      // First hasCacheChecker 
      const { data, total } = this.state;
      // console.log(data, total)
      const { isValid, cachingData } = this.cacheHandler.hasCacheChecker();
      let cached = JSON.parse(localStorage.getItem('cached'));
    
      // no cache => set cache by newState
      if(!cached){
        return localStorage.setItem('cached', JSON.stringify([
          { id : this.cacheHandler.getCacheId(), data, total }
        ]))
      }
      // cache exists but needs to have more with newState
      if(!isValid){
        // if cache over 100 => get rid of the first 20  
        if( isValid && cached.length >= 100){ 
          cached = cached.filter((ele,idx) => idx >= 20)
          localStorage.removeItem('cached')
        }
        // over 100 or not update cache with newone
        cached.push({ id : this.cacheHandler.getCacheId(), data, total })
        return localStorage.setItem('cached', JSON.stringify(cached)) 
      }
    
    },
    
    getCacheId(state = this.state){
      const { filter, name, order, page, size, total } = state;
      const id = `filter=${filter}&name=${name}&order=${order}&page=${page}&size=${size}`
      return id
    },
    
    hasCacheChecker(state = this.state){
      // check cashdata with current state(updated)
      const id = this.cacheHandler.getCacheId(state)
      const cached = JSON.parse(localStorage.getItem('cached')) || [];
      // filter with id and range
      let filtered = cached.filter(ele => ele.id === id)

      const bool = filtered.length > 0 
      // console.log(filtered, bool)
      return { 
        isValid : bool, 
        cachingData : bool ? filtered : [],
      }
      
    },
    
    async searchCache(state= this.state, updateView=false){
    
      // cache invalid => requestApi or get data from it
      const { isValid, cachingData } = this.cacheHandler.hasCacheChecker(state);
      if( !isValid ){
        // after api, maunally render as it returns  async result
        const result = await this.cacheHandler.updateCacheByApi()
        if(result ){
          this.state = {...state, ...{ data : result.data},  ...{ total : result.total }}
          // this.renderAll()
        }
        else{
          // need to change this for better UI text
          alert("Error on cacheing update ")
        } 
      } 
      else{ // cache is valid to use
        // console.log("no need to req api ")
        // state update by cache & server side store, too
        this.state = {...state, ...{ data : cachingData[0].data , total : cachingData[0].total }}
        this.cacheHandler.updateStateByApi() 
      }
  
      if(updateView){
        // console.log('updateView==', state)
        this.renderAll()
      }
      return 
      
    },

    clearCache(initState){
      localStorage.removeItem('cached');
      if(initState) this.initState(initState);

      this.cacheHandler.setCache();
    },
        
    async updateCacheByApi(){
      console.log("request cache update")
      // cache invalid => request new state and cache 

      return await fetch(
        `/api/cache?${this.cacheHandler.getCacheId()}`, 
        { method: 'get'}
      )
      .then(result => result.json())
      .then(result => {
        let cached = JSON.parse(localStorage.getItem('cached'))
        if(!cached || cached.length === 0) cached = []   
        
        cached.push(result)
        localStorage.setItem('cached', JSON.stringify(cached))
        // window.location.href('http://localhost:8080/page?'+this.getCacheId())
        
        return result
      })
      .catch(err => {
        console.log(err)
        alert("일시적인 오류 입니다, 다시 시도해 주세요")
      })
    },
    
    async updateStateByApi(){
      // console.log('변경된 state before updateStateByApi', this.state)
      const result = await fetch(
        '/api/state', { 
          method : 'put',
          headers: { "content-type" : "application/json" },
          body: JSON.stringify(this.state),
      }).then(resp => {
        // console.log('resp from update state==', resp);
        return resp
      });
      
      return result.status === 400 
        ? alert("잘못된 요청에 의한 일시적 장애가 발생 했습니다! 조금 다시 시도해 주세요") :
        result.status === 404 
        ? alert("요청한 페이지를 찾을 수 없습니다.") :
        result.status === 500 
        ? alert("시스템 장애가 발생했습니다. 조금 있다가 다시 시도해 주세요") :
        result.status === 303 
        ? console.log(result)
        // window.location.href('http://localhost:8080/page?'+this.getCacheId())
        : null
    }
  
  }
}
