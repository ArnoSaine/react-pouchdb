const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');

const publicPath =
  process.env.NODE_ENV === 'production' ? '/react-pouchdb/' : '/';

const htmlWebpackPluginOptions = {
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
