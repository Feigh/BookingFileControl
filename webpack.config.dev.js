const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const tslintConfig = require("./tslint.json");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname),
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    compress: true
  },
  target: "web",
  entry: {
    app: "./src/example/index"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./scripts/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                //importLoaders: 1,
                modules: true,
                localIdentName: "[name]__[local]--[hash:base64:10]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    browsers: [
                      ">1%",
                      "last 4 versions",
                      "Firefox ESR",
                      "not ie < 9" // React doesn't support IE8 anyway
                    ],
                    flexbox: "no-2009"
                  })
                ]
              }
            },
            {
                loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin({
      chunks: "initial",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        }
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "src/example/index.html",
      inject: "body"
    }),
    new ExtractTextPlugin("css/style.css", { allChunks: true }),
    //new BundleAnalyzerPlugin()
  ]
};
