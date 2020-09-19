class ErrorHandler {
  static error(app, logger) {
    //  全局错误处理
    app.use(async (ctx, next) => {
      //  处理500错误
      try {
        await next();
      } catch (e) {
        // 错误日志记录
        logger.error(e);
        ctx.body = "500请求报错，正在积极修复";
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status === 404) {
        //  这里采用了腾讯公益的404页面
        ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
      }
    });
  }
}

export default ErrorHandler;
