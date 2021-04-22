import { SubPage } from '@/components/SubPage/base';
import { getLife } from '@/api';

interface LifePageProps {
  $target: Element;
}

function LifePage({ $target }: LifePageProps) {
  return SubPage({ $target, fetchList: getLife });
}

export { LifePage };
