export const createElement = (
  DOMstring: string,
  children?: Array<Element | null | false | undefined>
) => {
  const $template = document.createElement('template');
  $template.innerHTML = DOMstring;

  const $element = $template.content.firstElementChild?.cloneNode(true) as Element;

  if (children) {
    children.forEach(child => {
      if (!child) return;
      $element.appendChild(child);
    });
  }

  return $element;
};
