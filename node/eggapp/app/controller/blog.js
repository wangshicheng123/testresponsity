'use strict';

const Controller = require('egg').Controller;

class getBlogInfor extends Controller {
  async getBlogInfor() {
    const { ctx } = this;
    var results=await this.service.blog.getBlogInfor();
    console.log(results);
    ctx.body=results;
  }
}

module.exports = getBlogInfor;
