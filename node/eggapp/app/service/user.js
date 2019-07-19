const Service = require('egg').Service;
 
class UserService extends Service {
  async create() {
 
    const { ctx} = this;
 
    const result = await this.app.mysql.select('user');
    return result;
  }
}
 
module.exports = UserService;