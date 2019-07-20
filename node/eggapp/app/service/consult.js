const Service = require('egg').Service;
 
class ConsultService extends Service {
  async getConsultInfor() {

    const client1=this.app.mysql.get("db2");
 
    const result = client1.select('t_consult',
    {where: {
        status: "0"
    }});
    return result;
  }
}
 
module.exports = ConsultService;