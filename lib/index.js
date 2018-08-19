'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var defaultPrefix = 'data-test';
  var prefix = void 0;
  // let filenameAttr;
  var nodeNameAttr = void 0;

  var visitor = {
    Program: function Program(path, state) {
      if (state.opts.prefix) {
        prefix = 'data-' + state.opts.prefix;
      } else {
        prefix = defaultPrefix;
      }
      // filenameAttr = `${prefix}-file`;
      nodeNameAttr = prefix + '-id';
    },
    JSXOpeningElement: function JSXOpeningElement(path, state) {
      var attributes = path.container.openingElement.attributes;
      var newAttributes = [];

      if (path.container && path.container.openingElement && path.container.openingElement.name && path.container.openingElement.name.name && state.file && state.file.opts && state.file.opts.basename) {
        var stringLiteral = path.container.openingElement.name.name + '-' + state.file.opts.basename;

        attributes.map(function (item) {
          if (item && item.name && item.name.name && item.name.name === 'className') {
            stringLiteral = stringLiteral + item.value.value;
          }
        });

        stringLiteral = _.kebabCase(stringLiteral);

        newAttributes.push(t.jSXAttribute(t.jSXIdentifier(nodeNameAttr), t.stringLiteral(stringLiteral)));
      }

      attributes.push.apply(attributes, newAttributes);
    }
  };

  return {
    visitor: visitor
  };
};

//  weak
var _ = require('lodash');