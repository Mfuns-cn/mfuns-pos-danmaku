const path = require("path");

module.exports = {
  entry: {
    mfunsM7Engine: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    publicPath: "lib/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".json"],
    alias: {
      src: path.join(__dirname, "./src"), // 这样@符号就表示项目根目录中src这一层路径
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
