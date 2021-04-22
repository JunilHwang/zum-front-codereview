import { SubPage } from '@/components/SubPage/base';
import { getFood } from '@/api';

interface FoodPageProps {
  $target: Element;
}

function FoodPage({ $target }: FoodPageProps) {
  return SubPage({ $target, fetchList: getFood });
}

export { FoodPage };
