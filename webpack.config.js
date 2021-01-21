const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "datepicker.js",
    path: path.resolve(__dirname, "dist"),
    // library: "datepicker",
    libraryTarget: "commonjs2",
  },
  // devtool: "inline-source-map",
  // devtool: "source-map",
  // optimization: {
  //   runtimeChunk: true,
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    mainFiles: ["index"],
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          // path.resolve(__dirname, "/node_modules/lunar-typescript"),
          path.resolve(__dirname, "./src"),
        ],
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
            loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            // loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              // importLoaders: 1,
              modules: {
                compileType: "module",
                mode: "local",
                localIdentName: "[path]_[name]_[local]",
              },
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
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      // commonjs: "react",
      commonjs2: "react",
      // amd: "react",
      // root: "react",
    },
    ["lunar-typescript"]: {
      commonjs2: "lunar-typescript",
    },
  },
};
