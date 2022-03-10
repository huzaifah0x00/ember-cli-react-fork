'use strict';

const babel = require('broccoli-babel-transpiler');

module.exports = {
  name: 'ember-cli-react',

  preprocessTree: function(type, tree) {
    if (type === 'js') {
      const babelOptions = {
        filterExtensions: ['jsx', 'tsx'],
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
      };
      return babel(tree, babelOptions);
    }

    return tree;
  },

  options: {
    autoImport: {
      devtool: 'inline-source-map',
    },
  },
};
