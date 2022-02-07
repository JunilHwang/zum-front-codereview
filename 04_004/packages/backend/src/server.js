const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();
app.use(express.json());

class FakeDB extends Map {
  constructor(...args) {
    super(...args);
    this._autoIncrement = 0;
  }

  set(name, value) {
    if (typeof value !== 'object')
      throw new TypeError(`value is not object`);

    const has = this.has(name);
    if (!has) {
      value.id = this._autoIncrement++;
      value.timestamp = Date.now();
    }
    return super.set(name, value);
  }
}

class ArticleModel extends FakeDB {
  constructor(...args) {
    super(...args);

    this.cache = new Map();
    this.set('articles', []);
  }

  list() {
    if (this.cache.has('list')) {
      return this.cache.get('list');
    }
    const articles = this.get('articles');
    this.cache.set('list', articles);

    return articles;
  }

  read(id) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const article = this.get(`articles:${id}`);
    this.cache.set(id, article);

    return article;
  }

  write(article) {
    this.cache.clear();
    this.get('articles').unshift(article);
    const id = this._autoIncrement;
    this.set(`articles:${id}`, article);
    return id;
  }

  modify(id, modified) {
    this.cache.clear();
    this.set('articles',
      this.get('articles')
        .map(article => article.id === Number(id) ? modified : article)
    );
    this.set(`articles:${id}`, modified);
  }

  remove(id) {
    this.cache.clear();
    this.set(
      'articles',
      this.get('articles')
        .filter(article => article.id !== Number(id))
    );
    this.delete(`articles:${id}`);
  }
}

const model = new ArticleModel();

/** NOTE: 더미데이터 삽입 */
const dummy = require('./dummy')
  .map((item, i) => ({
    ...item,
    timestamp: Math.floor(Math.random() * Date.now()),
  }))
  .sort((a, b) => a.timestamp - b.timestamp)
  .map((item, i) => ({ ...item, id: i + 1 }))
  .reverse();
const mapSet = Map.prototype.set;
mapSet.call(model, 'articles', dummy);
dummy.forEach(item => mapSet.call(model, `articles:${item.id}`, item));
model._autoIncrement = dummy.length + 1;
/** NOTE: END */

const router = express.Router();
router.get('/articles', (req, res) => {
  res.json(model.list());
});

router.get('/articles/:id', (req, res) => {
  /** @type {Article | undefined} */
  const article = model.read(req.params.id);
  if (!article) {
    res.status(404).json({message: 'not found'});
  } else {
    res.json(article);
  }
});

router.post('/articles', (req, res) => {
  /** @type {RequiredArticle} */
  const article = req.body;
  const id = model.write(article);

  res.status(201).json({message: 'created', id });
});

router.put('/articles/:id', (req, res) => {
  const id = req.params.id;
  const key = `articles:${id}`;

  if (!model.has(key)) {
    res.status(404).json({message: 'not found'});
  } else {
    /** @type {RequiredArticle} */
    const modifiedArticle = { ...model.get(key), ...req.body };
    model.modify(id, modifiedArticle);

    res.json({message: 'ok', id });
  }
});

router.delete('/articles/:id', (req, res) => {
  const id = req.params.id;
  if (!model.has(`articles:${id}`)) {
    res.status(404).json({status: 'not found'});
  } else {
    model.remove(id);

    res.json({status: 'ok'});
  }
});

app.use('/api', router);
app.use(history());

if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(
      path.resolve(path.join(__dirname, '..', '..', 'frontend', 'dist'))
    )
  );
}

const port = process.env.NODE_ENV === 'production' ? 3000 : 3001;
app.listen(port, () => console.log(`server listen at ${port}`));
