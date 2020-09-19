import Router from '@koa/router'
import IndexController from './IndexController'
import ApiController from './ApiController'
import BooksController from './BooksController'


const indexController = new IndexController();
const apiController = new ApiController();
const booksController = new BooksController();

const router = new Router();

//  初始化控制器函数
function initController(app){
    router.get('/',indexController.actionIndex);
    router.get('/api/getBooksList',apiController.actionBooksList)
    router.get('/books/list',booksController.actionBooksListPage)
    router.get("/books/create", booksController.actionBooksCreatePage);

    app.use(router.routes()).use(router.allowedMethods());
}

export default initController;