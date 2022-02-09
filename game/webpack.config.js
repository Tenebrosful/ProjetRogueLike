const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?/,
        use: "ts-loader",
      }
    ]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../web-server/public/game"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: { 
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
    }
  },

};