import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import { CategoryMenu } from '@/components';
import categoryListStyle from './categoryList.module.scss';
import route from '@/route';
import { CULTURE_PAGE, FOOD_PAGE, HOME_PAGE, LIFE_PAGE, TRIP_PAGE } from '@/route/path';

interface CategoryListProps {}

const { list } = categoryListStyle;
const { navigate } = route;

export const CategoryList: FunctionComponent<CategoryListProps> = () => {
  const onNavigatehandler = (event: Event) => {
    event.preventDefault();

    const target = event.target as Element;
    if (!target.matches('button[data-route]')) return;
    const path = (target.parentNode as HTMLAnchorElement).pathname;

    navigate(path);
  };

  const $categoryList = createElement(`<ul class="${list}"></ul>`, [
    CategoryMenu({ textContent: '홈', to: HOME_PAGE }),
    CategoryMenu({ textContent: '라이프', to: LIFE_PAGE }),
    CategoryMenu({ textContent: '푸드', to: FOOD_PAGE }),
    CategoryMenu({ textContent: '여행', to: TRIP_PAGE }),
    CategoryMenu({ textContent: '컬처', to: CULTURE_PAGE }),
    CategoryMenu({ textContent: '테크', to: '' }),
    CategoryMenu({ textContent: '비즈', to: '' }),
    CategoryMenu({ textContent: '이슈', to: '' }),
    CategoryMenu({ textContent: '연예', to: '' }),
  ]);

  $categoryList.addEventListener('click', onNavigatehandler);

  return $categoryList;
};
