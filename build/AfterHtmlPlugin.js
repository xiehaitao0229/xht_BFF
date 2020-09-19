const pluginName = "AfterHtmlPlugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");

function createHtml(type, array) {
  let result = "";
  if (type === "js") {
    array.forEach((url) => {
      result += `<script src="${url}"></script>`;
    });
  }
  if (type === "css") {
    array.forEach((url) => {
      result += `<link href="${url}" rel="stylesheet"></link>`;
    });
  }
  return result;
}

class AfterHtmlPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 拿取 js、css
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          // console.log("静态资源：", data.assets);
          this.jsArray = data.assets.js;
          this.cssArray = data.assets.css;
          cb(null, data);
        }
      );

      //   重新写入 js、css
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          // console.log(data.html, 11);
          const scriptString = createHtml("js", this.jsArray);
          const linkString = createHtml("css", this.cssArray);
          data.html = data.html.replace("<!-- injectjs -->", scriptString);
          data.html = data.html.replace("<!-- injectcss -->", linkString);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = AfterHtmlPlugin;
