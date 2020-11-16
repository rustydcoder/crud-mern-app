const path = require("path");

module.exports = {
  entry: "./src/App.jsx",
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "app.bundle.js",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  // changed line
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, "static"),
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
      },
    },
  },
};
