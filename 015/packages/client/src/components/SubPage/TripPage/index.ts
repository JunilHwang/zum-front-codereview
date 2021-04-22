import { SubPage } from '@/components/SubPage/base';
import { getTrip } from '@/api';

interface TripPageProps {
  $target: Element;
}

function TripPage({ $target }: TripPageProps) {
  return SubPage({ $target, fetchList: getTrip });
}

export { TripPage };
