const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "webpack-numbers.js",
    path: path.resolve(__dirname, "../../webpack/webpack_guide/dist"), //todotodo
    library: "webpackNumbers",
    libraryTarget: "umd",
  },
  devtool: "inline-source-map",
  // devtool: "source-map",
  // optimization: {
  //   runtimeChunk: true,
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    mainFiles: ["index"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-typescript",
                { isTSX: true, allExtensions: true },
              ],
            ],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, "./src")],
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    },
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react",
    },
  },
};
