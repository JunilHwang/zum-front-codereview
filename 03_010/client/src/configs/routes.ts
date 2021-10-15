import DetailPage from '@src/pages/DetailPage';
import ErrorPage from '@src/pages/ErrorPage';
import FavoritesPage from '@src/pages/FavoritesPage';
import HomePage from '@src/pages/HomePage';
import SubPage from '@src/pages/SubPage';

export type RoutesStore = {
  '/': typeof HomePage;
  '/lifes': typeof SubPage;
  '/travels': typeof SubPage;
  '/foods': typeof SubPage;
  '/cultures': typeof SubPage;
  '/favorites': typeof FavoritesPage;
  '/detail': typeof DetailPage;
  '/error': typeof ErrorPage;
  [key: string]: any;
};

export const routesConfig: RoutesStore = {
  '/': HomePage,
  '/lifes': SubPage,
  '/travels': SubPage,
  '/foods': SubPage,
  '/cultures': SubPage,
  '/favorites': FavoritesPage,
  '/detail': DetailPage,
  '/error': ErrorPage,
};
