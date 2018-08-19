// @flow weak

export default function({types: t}) {
  const defaultPrefix = 'data-test';
  let prefix;
  // let filenameAttr;
  let nodeNameAttr;

  const visitor = {
    Program(path, state) {
      if (state.opts.prefix) {
        prefix = `data-${state.opts.prefix}`;
      } else {
        prefix = defaultPrefix;
      }
      // filenameAttr = `${prefix}-file`;
      nodeNameAttr = `${prefix}-id`;
    },
    JSXOpeningElement(path, state) {
      const attributes = path.container.openingElement.attributes;

      const newAttributes = [];

      console.log('JSXOpeningElement', attributes);

      if (path.container && path.container.openingElement &&
        path.container.openingElement.name &&
        path.container.openingElement.name.name && state.file && state.file.opts && state.file.opts.basename) {
        const stringLiteral = `${path.container.openingElement.name.name }-${ state.file.opts.basename}`;
        newAttributes.push(t.jSXAttribute(
          t.jSXIdentifier(nodeNameAttr),
          t.stringLiteral(stringLiteral))
        );
      }

      attributes.push(...newAttributes);
    },
  };

  return {
    visitor,
  };
}
