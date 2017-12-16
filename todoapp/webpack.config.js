const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');

const baseHref = '/react-pouchdb/';
const publicPath =
  process.env.npm_lifecycle_event === 'bundle' ? '' : '/build/';

module.exports = {
  output: { publicPath },
  devServer: {
    proxy: {},
    historyApiFallback: { index: publicPath }
  },
  plugins: [
    new HtmlWebpackPlugin({
      baseHref,
      mobile: true,
      inject: false,
      template,
      title: 'React PouchDB Todo App'
    })
  ]
};
