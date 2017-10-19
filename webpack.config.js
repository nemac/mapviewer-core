
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),

  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },

  devtool: "#inline-source-map",
}
