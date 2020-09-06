const Koa = require('koa');
const staticService = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const config = require('./config');
const initController = require('./controllers');
const errorHander = require('./middlewares/errorHandle')

const app = new Koa();

//  swing模板
app.context.render = co.wrap(
    render({
        root:config.viewsDir,
        cache:config.cache,
        varControls:['[[',']]']
    })
)
//  初始化中间件
app.use(staticService(config.staticDir));

// 错误处理
errorHander.error(app)
//  初始化路由      
initController(app);

app.listen(config.port,()=>{
    console.log(`server is running at http://localhost:${config.port}`);
})