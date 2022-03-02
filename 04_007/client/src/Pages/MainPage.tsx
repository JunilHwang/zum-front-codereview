import React from '../react';
import Header from '../Components/Header';
import Control from '../Components/Control';
import ArticleList from '../Components/ArticleList';
import Pagination from '../Components/Pagination';

const MainPage = () => {
  return (
    <>
      <Header />
      <Control />
      <ArticleList />
      <Pagination />
    </>
  );
};

export default MainPage;
