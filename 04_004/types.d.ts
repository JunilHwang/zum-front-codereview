type RequiredArticle = {
  title: string;
  content: string;
  author: string;
}

type Article = RequiredArticle & {
  id: number;
  timestamp: number;
};
