import { ContentList } from '@/components';
import { Ranking, RecentContent } from '@/containers';
import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import homeStyle from './home.module.scss';

interface HomeProps {}

const { home } = homeStyle;

export const Home: FunctionComponent<HomeProps> = () => {
  return createElement(`<main class="${home}"></main>`, [RecentContent({}), Ranking({})]);
};
