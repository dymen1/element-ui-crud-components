var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui-crud-components/packages/${key}`] = `element-ui-crud-components/lib/${key}`;
});

externals['element-ui-crud-components/src/locale'] = 'element-ui-crud-components/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui-crud-components/src/utils/${file}`] = `element-ui-crud-components/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui-crud-components/src/mixins/${file}`] = `element-ui-crud-components/lib/mixins/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'element-ui-crud-components': path.resolve(__dirname, '../'),
  'class-component': path.resolve(__dirname, '../src/utils/class-component'),
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
