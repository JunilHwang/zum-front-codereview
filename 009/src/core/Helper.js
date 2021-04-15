const getComponentElement = element => {
  const componentNodes = [...document.querySelectorAll('[data-component]')]
  return componentNodes.find(el => el.getAttribute('data-component') === element)
}

export { getComponentElement }