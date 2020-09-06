const Router = require('@koa/router');
const IndexController = require('./IndexController');
const ApiController = require('./ApiController');

const indexController = new IndexController();
const apiController = new ApiController();

const router = new Router();

//  初始化控制器函数
function initController(app){
    router.get('/',indexController.actionIndex);
    router.get('/api/getDataList',apiController.actionDataList)

    app.use(router.routes()).use(router.allowedMethods());
}

module.exports = initController;