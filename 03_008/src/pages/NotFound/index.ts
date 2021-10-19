import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';

interface NotFoundProps {}

export const NotFound: FunctionComponent<NotFoundProps> = () => {
  return createElement('<div></div>');
};
