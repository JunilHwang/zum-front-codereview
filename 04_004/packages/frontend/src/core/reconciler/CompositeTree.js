import { InstanceTree } from './InstanceTree';
import { instantiateTree } from './internal';

function getExtendedProps(type, props) {
  return {...type.defaultProps, ...props};
}

export class CompositeTree extends InstanceTree {
  constructor(tree) {
    super(tree);
    this.rendered = null;
  }

  getHost() {
    return this.children.getHost();
  }

  mount() {
    const { type, props } = this.tree;

    const diffChildren = component => {
      const nextChildTree = component.render();
      this.children.diff(nextChildTree);
    };

    const EnhancedType = class extends type {
      setState(partialState) {
        super.setState(partialState);
        diffChildren(this);
      }

      forceUpdate() {
        diffChildren(this);
      }

      render() {
        const rendered = super.render();
        if (rendered === null || typeof rendered === 'boolean') {
          return '';
        } else if (typeof rendered === 'number') {
          return String(rendered);
        }
        return rendered;
      }
    };
    EnhancedType.defaultProps = type.defaultProps || {};

    const extendedProps = getExtendedProps(EnhancedType, props);
    const instance = new EnhancedType(extendedProps);
    instance.props = extendedProps;
    this.instance = instance;
    this.setRef();

    this.rendered = instance.render();
    this.children = instantiateTree(this.rendered);
    this.children.parent = this;

    const node = this.children.mount();
    if (!node._mountedInstanceTree) {
      node._mountedInstanceTree = this;
    }

    if (typeof instance.componentDidMount === 'function') {
      queueMicrotask(() => instance.componentDidMount());
    }
    return node;
  }

  unmount(nextInstance) {
    const instance = this.instance;
    this.unsetRef();
    if (typeof instance.componentWillUnmount === 'function') {
      instance.componentWillUnmount();
    }
    const parent = this.parent;
    if (parent) {
      parent.children = nextInstance;
    }
    const host = this.getHost();
    delete host._mountedInstanceTree;

    this.children.unmount(nextInstance);
  }

  diff(nextTree) {
    if (this.tree.type !== nextTree.type) {
      const nextInstance = instantiateTree(nextTree);
      nextInstance.parent = this.parent;
      this.unmount(nextInstance);
      return;
    }

    const host = this.getHost();
    if (!host._mountedInstanceTree) {
      if (typeof this.instance.componentDidMount === 'function') {
        queueMicrotask(() => {
          this.instance.componentDidMount();
        });
      }
    }

    const NextType = nextTree.type;
    const extendedProps = getExtendedProps(NextType, nextTree.props);
    const nextInstance = new NextType(extendedProps);
    nextInstance.props = extendedProps;
    const nextRendered = nextInstance.render();

    // FIXME: state, props 비교
    if (typeof this.instance.componentDidUpdate === 'function') {
      const prevState = this.instance.state;
      const prevProps = this.instance.props;
      queueMicrotask(() => {
        this.instance.componentDidUpdate(prevState, prevProps);
      });
    }
    this.children.diff(nextRendered);

    this.rendered = nextRendered;
    this.instance.props = extendedProps;
  }
}
