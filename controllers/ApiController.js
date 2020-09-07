import Controller from './BaseController'

class ApiController extends Controller {
  constructor() {
    super();
  }
  actionBooksList(ctx) {
    ctx.body = [
      {
        id: 1,
        name: "xht",
      },
      {
        id: 2,
        name: "xht2",
      },
    ];
  }
}

export default ApiController;
