const path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve("./frontend/static/frontend/"),
    filename: "main.js",
    publicPath: "/static/frontend/",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|ttf|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', "css-loader"],
      },
    ],
  },
  plugins: [
    new BundleTracker({
      filename: "./webpack-stats.json",
    }),
  ],
  optimization: {
    sideEffects: false,
  }
};
