import Controller from './BaseController'

class IndexController extends Controller{
    constructor(){
        super();
    }

    async actionIndex(ctx){
        ctx.body = await ctx.render('index',{
            name:'xht'
        });
    }
}

export default IndexController;