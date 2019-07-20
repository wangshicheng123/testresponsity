'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    var results=await this.service.user.create();
    ctx.body=results;
  }
}

module.exports = HomeController;
