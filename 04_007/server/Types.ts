export interface typeArticleDB {
  articleid: number;
  username: string;
  articlename: string;
  articletext: string;
  created_at: string;
  modified_at: string;
}

export interface typeListArticle {
  username: string;
  articlename: string;
  articletext: string;
  articlePerPage: number;
  currentPage: number;
  orderby: string;
}

export interface returnListArticle {
  result: typeArticleDB[] | [];
}

export interface typeGetArticle {
  articleid: number;
}

export interface typeNewArticle {
  username: string;
  articlename: string;
  articletext: string;
}

export interface typeModifyArticle {
  articleid: number;
  articlename: string;
  articletext: string;
}

export interface typeDeleteArticle {
  articleid: number;
}
