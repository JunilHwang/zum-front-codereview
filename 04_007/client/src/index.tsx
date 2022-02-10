import { VirtualDOM, getHash, getHtml } from './react';
import { recoilState } from './recoil';
import MainPage from './Pages/MainPage';
import GetArticle from './Pages/GetArticle';
import WriteArticle from './Pages/WriteArticle';
import './index.css';

//Initial rendering
const MainPageRendered = MainPage();
const GetArticleRendered = GetArticle();
const WriteArticleRendered = WriteArticle();
VirtualDOM.set(getHash(MainPageRendered), getHtml(MainPageRendered));
VirtualDOM.set(getHash(GetArticleRendered), getHtml(GetArticleRendered));
VirtualDOM.set(getHash(WriteArticleRendered), getHtml(WriteArticleRendered));

export const reRender = () => {
  //Save current DOM
  const storeThisPage = document.getElementById('app')?.childNodes;
  VirtualDOM.set(getHash(storeThisPage), getHtml(storeThisPage));

  //Render new DOM
  let renderThisPage;
  const searchParams = new URLSearchParams(window.location.search);
  if (window.location.search === '') renderThisPage = VirtualDOM.get(getHash(MainPageRendered));
  else if (searchParams.get('articleid'))
    renderThisPage = VirtualDOM.get(getHash(GetArticleRendered));
  else if (searchParams.get('action') === 'write')
    renderThisPage = VirtualDOM.get(getHash(WriteArticleRendered));
  else renderThisPage = VirtualDOM.get(getHash(MainPageRendered));

  if (!renderThisPage) return;
  document.getElementById('app').innerHTML = '';
  document.getElementById('app').innerHTML = renderThisPage;
};

reRender();
