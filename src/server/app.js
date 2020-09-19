import Koa from "koa";
import staticService from "koa-static";
import render from "koa-swig";
import co from "co";
import log4js from "log4js";
import config from "./config";
import initController from "./controllers";
import errorHander from "./middlewares/errorHandle";

const app = new Koa();
const logger = log4js.getLogger("xht");

//  记录错误日志
log4js.configure({
  appenders: { globalError: { type: "file", filename: "./logs/error.log" } },
  categories: { default: { appenders: ["globalError"], level: "error" } },
});

//  swing模板
app.context.render = co.wrap(
  render({
    root: config.viewsDir,
    cache: config.cache,
    varControls: ["[[", "]]"],
  })
);
//  初始化中间件
app.use(staticService(config.staticDir));

// 错误处理
errorHander.error(app,logger);
//  初始化路由
initController(app);

app.listen(config.port, () => {
  console.log(`server is running at http://localhost:${config.port}`);
});
