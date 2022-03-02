import Database from '../database/database.js';

const tableName = 'article';

type DataObject = {
  [propsName: string]: any;
};

const articleService = {
  postArticle: (payload: DataObject) => {
    try {
      const data = Database.create(tableName, payload);
      return data;
    } catch (err) {
      throw Error(err as string);
    }
  },

  getArticle: (info: DataObject) => {
    try {
      let data = null;
      if (Object.keys(info).length === 0) {
        data = Database.readAll(tableName);
      } else {
        data = Database.read(tableName, info);
      }
      return data;
    } catch (err) {
      throw Error(err as string);
    }
  },
  updateArticle: (id: string, payload: DataObject) => {
    try {
      Database.update(tableName, id, payload);
    } catch (err) {
      throw Error(err as string);
    }
  },
  deleteArticle: (id: string) => {
    try {
      Database.delete(tableName, id);
    } catch (err) {
      throw Error(err as string);
    }
  },
};

export default articleService;
