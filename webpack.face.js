const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cwd = process.cwd();

module.exports = (options = {}) => {  
  const pack = require(options.packagePath || path.join(cwd, 'package.json'));
  const banner = options.banner || `${pack.name} face\n@version ${pack.version}\n{@link ${pack.homepage}}`;
  const plugins = [];
  plugins.push(new webpack.BannerPlugin({ banner }));
  plugins.push(new MiniCssExtractPlugin({ filename: 'style.css' }));
  plugins.push(new CleanWebpackPlugin(['dist/face/*'], { root: cwd }));  
  plugins.concat(options.plugins || []);
  const include = [
    path.resolve(__dirname, 'src/browser/face'),
    path.resolve(__dirname, 'node_modules/akili')
  ].concat(options.include || []);
  const isProd = options.isProd === undefined? process.env.NODE_ENV == 'production': options.isProd;
  const entry = {};
  entry[`${pack.name}.face`] = options.entry || path.resolve(cwd, 'src/browser/face');

  return {
    mode: isProd? 'production': 'development',
    performance: { hints: false },
    watch: !isProd,
    devtool: isProd? false: "inline-source-map",
    entry,
    output: {
      path: options.distPath || path.join(cwd, '/dist/face'),
      filename: "[name].js",
      publicPath: '/'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false     
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include,
          query: {
            presets: ['akili'],
            plugins: ['transform-runtime']
          }
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }
      ]
    },
    plugins
  };
};