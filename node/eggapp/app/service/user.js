const Service = require('egg').Service;
 
class UserService extends Service {
  async create() {
 
    const { ctx} = this;

    const client1=this.app.mysql.get("db1");
 
    const result = client1.select('t_user');
    return result;
  }
}
 
module.exports = UserService;