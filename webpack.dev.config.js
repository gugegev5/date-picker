const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./demo/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "lib demo",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /demo/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "demo"),
  },
};
