import { HostTree } from './HostTree';
import { instantiateTree } from './internal';

export class TextTree extends HostTree {
  constructor(tree) {
    super(tree);
    this.tree = {type: '#text', children: tree, props: {}};
    // 텍스트는 자식노드가 없다
    this.children = null;
  }

  mount() {
    const node = document.createTextNode(this.tree.children);
    this.instance = node;
    this.setRef();
    return node;
  }

  diff(nextTree) {
    if (typeof nextTree !== 'string') {
      this.unmount(instantiateTree(nextTree));
      return;
    }
    const host = this.getHost();
    if (host.value !== nextTree) {
      this.transaction.push({
        type: 'replace',
        payload: {
          value: nextTree,
        }
      });
    }
    this.process();
  }

  process() {
    this.transaction.forEach(({ payload }) => {
      const host = this.getHost();
      host.nodeValue = payload.value;
    });
  }
}
