const Article = {
  tableName: 'article',
  tableInfo: {
    id: {
      type: 'INTEGER',
      config: { allowNull: false, isPrimaryKey: true },
    },
    title: {
      type: 'STRING',
      config: { maxLength: 30 },
    },
    author: {
      type: 'STRING',
      config: { maxLength: 10 },
    },
    createdAt: {
      type: 'DATE',
    },
  },
};

export default Article;
