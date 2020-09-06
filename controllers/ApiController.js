const Controller = require("./BaseController");

class ApiController extends Controller {
  constructor() {
    super();
  }
  actionDataList(ctx) {
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

module.exports = ApiController;
