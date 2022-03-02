export const VirtualDOM = new Map();

export const getHash = (page: any) => {
  let hash = '';
  for (const item of page) hash += item.localName;
  return hash;
};

export const getHtml = (page: any) => {
  let html = '';
  for (const item of page) html += item.outerHTML;
  return html;
};

const React = {
  createElement: (type: string, props: null, ...internalText: any) => {
    // console.dir(type);
    // console.dir(props);
    // console.dir(internalText);
    // console.dir(this);

    if (!type) return internalText;
    const element = document.createElement(type);
    element.innerHTML += internalText.join('');
    return element;
  },
  render: (element: Node, container: HTMLElement) => {
    //console.dir(element);
    if (Array.isArray(element)) {
      element.forEach((e) => {
        container.appendChild(e);
      });
      return;
    }
    container.appendChild(element);
  },
};
export default React;
