'use strict';

const Controller = require('egg').Controller;

class getConsultInfor extends Controller {
  async getConsultInfor() {
    const { ctx } = this;
    var results=await this.service.consult.getConsultInfor();
    console.log(results);
    ctx.body=results;
  }
}

module.exports = getConsultInfor;
