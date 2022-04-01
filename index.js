'use strict';

const babel = require('broccoli-babel-transpiler');

module.exports = {
  name: require('./package').name,

  preprocessTree: function (type, tree) {
    if (type === 'js') {
      const babelOptions = {
        filterExtensions: ['jsx', 'tsx'],
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
      };
      return babel(tree, babelOptions);
    }

    return tree;
  },
};
