import { SubPage } from '@/components/SubPage/base';
import { getCulture } from '@/api';

interface CulturePageProps {
  $target: Element;
}

function CulturePage({ $target }: CulturePageProps) {
  return SubPage({ $target, fetchList: getCulture });
}

export { CulturePage };
