const Service = require('egg').Service;

class TeacherService extends Service {
    async getAllTeacher() {
        const client1 = this.app.mysql.get("db2");

        const result = client1.select('t_teacher');
        return result;
    }

    async addTeacher(){
        const client1 =this.app.mysql.get("db2");
        const res =client1.insert("t_teacher", {nick_name: "234567", password: "984161651"});
        return res;
    }

    async deleteTeacher(){
        const client1=this.app.mysql.get("db2");
        const res=client1.delete("t_teacher",{tea_id: 4});
        return res
    }
}

module.exports = TeacherService;