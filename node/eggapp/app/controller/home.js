'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    //ctx.body = 'hi, egg';
    var results=await this.service.user.create();
    console.log(results);
    ctx.body="laoshan";
  }
}

module.exports = HomeController;
