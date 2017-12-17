const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');

const baseHref = '/react-pouchdb/';
const publicPath =
  process.env.npm_lifecycle_event === 'bundle' ? '' : '/build/';

const htmlWebpackPluginOptions = {
  baseHref,
  inject: false,
  mobile: true,
  template,
  title: 'React PouchDB Todo App'
};

module.exports = {
  output: { publicPath },
  devServer: {
    proxy: {},
    historyApiFallback: { index: publicPath }
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginOptions,
      filename: '404.html'
    })
  ]
};
