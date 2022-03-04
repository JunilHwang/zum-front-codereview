require('global-jsdom/register')
const express = require('express');
const cors = require('cors')
const fs =require('fs');
const path = require('path')

const server = express(); 
const PORT = 3001;

const getStringHtml = require('./src/ssr.service.js');
const { store } = require('./src/store.js');
const { 
  updateStateByQueryExecutor, 
  getPathURL, getInitialState, 
  updatePost, createPost, deletePost, 
} = require('./src/executor.js')

server.options('*', cors());
server.use(express.json())
server.use(express.urlencoded({ extended : true }))
server.use(express.static(path.resolve(__dirname, 'public')));

const updateCache = (req, res) => {
  if(!req.query) return res.status(400).end();

  store.setState(updateStateByQueryExecutor(req.query));
  const { data, total } = store.state

  res.json({ id : getPathURL(store.state), data, total })
};

const updateState = async (req, res)=> {
  if( !req.body ) return res.status(400).end(); 
  store.setState(req.body)
  return res.status(203).end();
}

server.get('/', async (req, res) => {
  
  store.setState(getInitialState()) 
  const redirectTo = `/list?` + getPathURL(store.state);
 
  return res.redirect(redirectTo)  ;
})

server.get('/list', async (req, res) => {

  if(
    !store.state ) store.setState(getInitialState())
  // const filePath = 'list?' + getPathURL(req.query)
  // const fileURL = path.resolve(__dirname,'../../client/resources' , 'index_'+ filePath +'.html');

  const filePath = 'list';
  const fileURL = path.resolve(process.env.INIT_CWD, '..', 'client', 'resources' , 'index_'+ filePath +'.html');
  
  let html = await getStringHtml({ url : '/', state : store.state, index : 0 })
  await fs.writeFileSync(fileURL, html);

  return res.send(html)
})

server.get('/post-single', async (req, res) => {

  const { index } = req.query; 
  const result = await getStringHtml({ url : '/post-single', state : store.state, index } )
  
  return res.send(result)
})

server.get('/post-edit', async (req, res) => {

  let { index } = req.query; 
  const result = await getStringHtml( { url : '/post-edit', state : store.state , index} )

  return res.send(result)
})

server.get('/api/cache', updateCache);
server.put('/api/state', updateState);

server.post('/post/edit', (req, res) => {

  if(req.body.id === ''){ 
    if(!createPost(req.body) ) 
      return res.status(500).send('Internal server error');

    store.setState( updateStateByQueryExecutor(
      { filter : "", order : 'dsc', name : "",  page : 1, size : 5 }
      )
    )
    return res.json(store.state)
  }

  if( !updatePost(req.body)) 
    return res.status(500).send('Internal server error');

  const name = store.state.name !== '' ? req.body.writer : '';
  store.setState({ name })
  store.setState( updateStateByQueryExecutor(store.state) );

  return res.json(store.state)
})

server.delete('/post/delete', (req,res) => {

  if( !deletePost(req.query.id) ) 
    return res.status(500).send("Internal server error");
  
  store.setState( updateStateByQueryExecutor(
    { filter : "", order : 'dsc', name : "",  page : 1, size : 5 }
  ));
  
  return res.status(202).json(store.state);
})


server.listen(PORT, ()=> {
  console.log("server listning by Port= "+PORT)
})
