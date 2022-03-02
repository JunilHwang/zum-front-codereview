module.exports = function (babel) {
  const t = babel.types;
  return {
    name: 'jsx-babel-transpile',
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = openingElement.name.name;
        const args = [];
        args.push(t.stringLiteral(tagName));
        const attribs = t.nullLiteral();
        args.push(attribs);
        const reactIdentifier = t.identifier('React');
        const createElementIdentifier = t.identifier('createElement');
        const callee = t.memberExpression(reactIdentifier, createElementIdentifier);
        const callExpression = t.callExpression(callee, args);
        callExpression.arguments = callExpression.arguments.concat(path.node.children);
        path.replaceWith(callExpression, path.node);
      },
    },
  };
};
