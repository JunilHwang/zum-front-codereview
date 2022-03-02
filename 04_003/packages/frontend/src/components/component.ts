type DataObject = { [propsName: string]: any };

export const ListenerStorage = (() => {
  const storage = new Map();
  return {
    storage,
    setListener: (name: string, listener: Function) => {
      storage.set(name, listener);
    },
  };
})();

export const ComponentStorage = (() => {
  const storage = new Map();
  return {
    storage,
    setComponent: (name: string, ComponentClass: any) =>
      storage.set(name, new ComponentClass(name, {}, {}).constructor),
  };
})();

export default class Component {
  name: string;
  state: DataObject;
  props: DataObject;
  element: HTMLElement;
  template: (state: DataObject) => string;
  JSXObject: DataObject;
  html: HTMLElement | null;

  constructor(name: string, state: DataObject, props: DataObject) {
    this.name = name;
    this.state = state;
    this.props = props;
    this.element = document.createElement('div');
    this.template = () => '';
    this.JSXObject = {};
    this.html = null;

    Object.keys(this.props).forEach(key => {
      this.element.setAttribute(key, this.props[key]);
    });
  }

  toJSXObject(JSXString: string) {
    const regexTag = /<\/?[\w\s\d\"\=\[\]\(\)\{\}\,\:\+\-ㄱ-힣]+>/g;
    const regexOpenTag = /<[\w\s\d\"\=\[\]\(\)\{\}\,\:\+\-ㄱ-힣]+>/g;
    const regexOpenCloseTag = /^<[\w\s\d\"\=\[\]\(\)\{\}\,\:\+\-ㄱ-힣]+\/>/;
    const totalTag = JSXString.match(regexTag);

    let wrapperElement = {};

    const originSource = JSXString.trim().replace(/>[\s\n]*</g, '><');

    const createAttrs = (attrs: string[]) => {
      const props: DataObject = {};
      const events: DataObject = {};
      attrs.forEach((attr: string) => {
        const [key, value] = attr.split('=');
        if (key.startsWith('on')) {
          const event = key.replace('on', '').toLowerCase();
          events[event] = value.replace(/\"/g, '');
        } else if (key === 'data') {
          props[key] = JSON.parse(value);
        } else {
          props[key] = value.replace(/\"/g, '');
        }
      });
      return { props, events };
    };

    const createTagObject = (
      source: string,
      parent: DataObject | null = null,
    ) => {
      let resource = source.slice();
      const tags = resource.match(regexOpenTag);

      if (tags) {
        tags.forEach(tagString => {
          if (resource.includes(tagString)) {
            let tag, attrs;
            const removedBracketTag = tagString.replace(/>|</g, '');
            if (tagString.includes('data')) {
              const firstWSIndex = tagString.indexOf(' ');
              tag = removedBracketTag.slice(0, firstWSIndex - 1).trim();
              attrs = [
                removedBracketTag
                  .slice(firstWSIndex, removedBracketTag.length)
                  .trim(),
              ];
            } else {
              [tag, ...attrs] = removedBracketTag.split(' ');
            }
            const closeTag = `</${tag}>`;
            const { props, events } = createAttrs(attrs);

            const element: DataObject = {
              type: tag,
              props,
              events,
              children: [],
            };

            const tagStartIndex = resource.indexOf(tagString);
            let tagCloseIndex = resource.indexOf(closeTag);

            if (tagCloseIndex !== -1) {
              const totalTagStartIndex = totalTag?.indexOf(tagString) as number;
              const totalTagEndIndex = totalTag?.indexOf(closeTag) as number;

              if (totalTagEndIndex - totalTagStartIndex !== 1) {
                tagCloseIndex = resource.lastIndexOf(closeTag);
                (totalTag as RegExpMatchArray).shift();
                (totalTag as RegExpMatchArray).pop();
              } else {
                (totalTag as RegExpMatchArray).shift();
                (totalTag as RegExpMatchArray).shift();
              }

              const childStartIndex = tagStartIndex + tagString.length;
              const childEndIndex = tagCloseIndex;
              const children = resource.slice(childStartIndex, childEndIndex);

              resource = resource.slice(tagCloseIndex + closeTag.length);

              if (regexOpenTag.test(children)) {
                createTagObject(children, element);
              } else {
                if (regexOpenCloseTag.test(children)) {
                  const [childTag, ...childAttrs] = children
                    .replace(/\/>|</g, '')
                    .trim()
                    .split(' ');
                  const { props, events } = createAttrs(childAttrs);
                  const childElement = {
                    type: childTag,
                    props,
                    events,
                    children: [],
                  };
                  element.children.push(childElement);
                } else {
                  element.children.push(children);
                }
              }

              if (parent) {
                parent.children.push(element);
              } else {
                wrapperElement = element;
              }
            } else {
              (parent as DataObject).text += resource;
            }
          }
        });
      }
    };

    createTagObject(originSource);

    return wrapperElement;
  }

  toHTML(JSXObject: DataObject) {
    const ComponentList = Array.from(ComponentStorage.storage.keys());

    const createElement = (JSXObject: DataObject) => {
      const { type, props, events, children } = JSXObject;
      const propsKeys = Object.keys(props ? props : {});
      const eventsKeys = Object.keys(events ? events : {});
      const node: HTMLElement = document.createElement(type);

      children
        ? children
            .map((child: DataObject | string) => {
              if (typeof child === 'string') {
                return document.createTextNode(child);
              } else if (ComponentList.includes(child.type)) {
                const childComponent = ComponentStorage.storage.get(child.type);
                const childInstance = new childComponent(
                  child.type,
                  { ...child.props.data },
                  { ...child.props },
                );
                return childInstance.element;
              } else {
                return createElement(child);
              }
            })
            .forEach((childNode: HTMLElement | Text) =>
              node.appendChild(childNode),
            )
        : '';

      if (propsKeys.length > 0) {
        propsKeys.forEach(key => node.setAttribute(key, props[key]));
      }

      if (eventsKeys.length > 0) {
        eventsKeys.forEach(event => {
          node.addEventListener(
            event,
            ListenerStorage.storage.get(events[event]),
          );
        });
      }

      return node;
    };
    return createElement(JSXObject);
  }

  setTemplate(template: (state: DataObject) => string) {
    this.template = template;
    this.render();
  }

  setState(state: DataObject) {
    this.state = state;
    this.render();
  }

  async setJSX() {
    const JSX = await this.template(this.state);
    this.JSXObject = this.toJSXObject(JSX);
  }

  setHTML() {
    this.html = this.toHTML(this.JSXObject);
  }

  async render() {
    await this.setJSX();
    this.setHTML();
    this.element.innerHTML = '';
    this.element.appendChild(this.html as HTMLElement);
  }
}
