/* eslint-disable prettier/prettier */
const path = require("path");

const ReactRefresh = require("@pmmmwh/react-refresh-webpack-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    withModules
      ? "css-loader"
      : {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: !isProd
              ? "[path][name]__[local]"
              : "[hash:base64]",
          },
        },
      },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: isProd ? "browserslist" : "web",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js",
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    !isProd && new ReactRefresh(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new TsCheckerPlugin(),
    new ProvidePlugin({
      React: "react"
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module.\s[ac]ss$/i,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module.\s[ac]ss$/i,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/i,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@components": path.join(srcPath, "components"),
      "@config": path.join(srcPath, "config"),
      "@styles": path.join(srcPath, "styles"),
      "@utils": path.join(srcPath, "utils"),
      "@pages": path.join(srcPath, "pages"),
      "@store": path.join(srcPath, "store"),
      "@models": path.join(srcPath, "models"),
      "@rootStore": path.join(srcPath, "store/rootStore"),
    },
    modules: ["node_modules"],
    mainFiles: ["index"],
  },
  devServer: {
    host: "127.0.0.1",
    port: 5501,
    hot: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
