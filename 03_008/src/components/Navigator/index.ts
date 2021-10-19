import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import { CategoryList } from '@/components';

interface NavigatorProps {}

export const Navigator: FunctionComponent<NavigatorProps> = () => {
  return createElement('<nav></nav>', [CategoryList({})]);
};
