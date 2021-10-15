import Component from '@src/core/Component';
import { _ } from '@src/utils/myUtils';
import { HubContent } from '@src/store/contents';

import Contents from '@src/components/common/Contents';

type ContentsWrapProps = {
  page: number;
  data: HubContent[];
  setContent: (page: number) => void;
};

export default class ContentsWrap extends Component<ContentsWrapProps> {
  mountChildComponent() {
    const path = location.pathname.replace('/', '');
    const title = ((path: string) => {
      return {
        lifes: '라이프',
        cultures: '컬처',
        foods: '푸드',
        travels: '여행',
        favorites: '즐겨찾기',
      }[path];
    })(path);
    const { data } = this.props;

    if (title) new Contents(this.$target, { title, data });
  }

  useEffect() {
    if (this.props.data.length >= 40) return;
    const io = this.getIntersectionObserver();
    this.observeLastRow(io);
  }

  observeLastRow(intersectionObserver: IntersectionObserver) {
    const contentsCards = _.$All('.contents-card', this.$target);
    contentsCards.forEach((value: Element) => {
      if (!value.nextElementSibling) intersectionObserver.observe(value);
    });
  }

  getIntersectionObserver() {
    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          this.updateContents(this.props.page);
          observer.unobserve(entry.target);
          this.observeLastRow(observer);
        }
      });
    }, observerOption);

    return io;
  }

  updateContents(page: number) {
    this.props.setContent(page + 1);
  }
}
