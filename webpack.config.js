const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const webpack = require('webpack');

const ExtractCssPluginConfig = new ExtractTextPlugin({
  filename: 'styles.[md5:contenthash:hex:20].css',
  allChunks: true,
  disable: process.env.NODE_ENV !== 'production',
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'src/index.html' });

const config = {
  entry: {
    bundle: './src/styles/main.scss',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractCssPluginConfig.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [new AutoprefixerPlugin()],
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractCssPluginConfig,
  ],
  devServer: {
    port: 8080,
    contentBase: './dist',
  },
};

module.exports = config;
