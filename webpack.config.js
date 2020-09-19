const path = require("path");
const glob = require("glob");
const { argv } = require("yargs");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AfterHtmlPlugin = require("./build/AfterHtmlPlugin");

const mode = argv.mode;
const envConfig = require(`./build/webpack.${mode}.js`);
console.log("构建环境：", mode);

/* 构建多页面的入口文件 */
const entrys = {};
const htmlPlugins = [];
const files = glob.sync("./src/web/views/**/*.entry.js");
files.forEach((file) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry.js/.test(file)) {
    const entryKey = RegExp.$1;
    const [pageName, actionName] = entryKey.split("-");
    entrys[
      entryKey
    ] = `./src/web/views/${pageName}/${pageName}-${actionName}.entry.js`;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        chunks: ["runtime", entryKey],
        inject:false,
        filename: `../views/${pageName}/pages/${actionName}.html`,
        template: `./src/web/views/${pageName}/pages/${actionName}.html`,
      })
    );
  }
});

const baseConfig = {
  mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, "./dist/web/assets"),
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [...htmlPlugins, new MiniCssExtractPlugin(), new AfterHtmlPlugin()],
};

module.exports = merge(baseConfig, envConfig);