export class InstanceTree {
  constructor(tree) {
    this.instance = null;
    this.children = null;
    this.parent = null;
    this.transaction = [];

    this.tree = tree;
    if (typeof tree === 'object') {
      this.key = tree.props.key;
    }
  }

  setRef() {
    if (typeof this.tree === 'object' && this.tree.props.ref) {
      this.tree.props.ref.current = this.instance;
    }
  }

  unsetRef() {
    if (typeof this.tree === 'object' && this.tree.props.ref) {
      this.tree.props.ref.current = null;
    }
  }
}
