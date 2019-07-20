const Service = require('egg').Service;
 
class getBlogInfor extends Service {
  async getBlogInfor() {

    const client1=this.app.mysql.get("db2");
 
    const result = client1.select('t_blog');
    return result;
  }
}
 
module.exports = getBlogInfor;