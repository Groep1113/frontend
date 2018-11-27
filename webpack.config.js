const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  // Do not crash on errors
  new webpack.NoEmitOnErrorsPlugin(),
  // Always uglify javascript source code
  new UglifyJsPlugin({ parallel: true }),
  // use app/index.html as a template to generate eventual build/index.html
  new HtmlWebpackPlugin({
    template: 'src/index.template.html',
    alwaysWriteToDisk: true,
  }),
  // use html-webpack-harddisk-plugin to add alwaysWriteToDisk option
  new HtmlWebpackHarddiskPlugin(),
  // add `defer` attribute to matching script tags
  new ScriptExtHtmlWebpackPlugin({
    defer: /(main.[a-z0-9]+.js|vendor.[a-z0-9]+.js|manifest.[a-z0-9]+.js)/i,
  }),
  // add a hash based on the relative path of the module
  new webpack.HashedModuleIdsPlugin(),
  // add all ExtractTextPlugin rule-test hits to a css file
  new MiniCssExtractPlugin({ filename: 'styles-[contentHash].css' }),
  // create compressed versions of files larger than 10kb
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
];

let optimization = {
  removeAvailableModules: false,
  removeEmptyChunks: false,
  splitChunks: false,
};

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
if (process.env.NODE_ENV !== 'development') {
  optimization = {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  };
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    })
  );
}

module.exports = {
  devtool: process.env.NODE_ENV === 'development'
    ? 'cheap-module-eval-source-map' : '',

  entry: './src/index.js',

  output: {
    filename: process.env.NODE_ENV === 'development'
      ? '[name].[hash].js' : '[name].[chunkHash].js',
    publicPath: '/',
    path: path.resolve(process.cwd(), 'build'),
    // might want to switch this for debug purposes, speeds up compile time tho
    pathinfo: false,
  },

  devServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        }],
      },
    ],
  },

  optimization,
  plugins,
};
