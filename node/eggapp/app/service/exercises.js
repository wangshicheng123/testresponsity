const Service = require('egg').Service;

class ExercisesService extends Service {
    async insertExercisesInfor() {
        const client1 = this.app.mysql.get("db1");

        const result = client1.insert('t_exercise', {title: "套题四", content: "dwrbg35w5gev",course_id: 4});
        return result;
    }

    async addMultiple(){
        const client1=this.app.mysql.get("db1");
        const res= client1.insert("t_multiple_choice", {title: "多选题一",exer_id: 4});
        return res;
    }

    async addSingle(){
        const client1=this.app.mysql.get("db1");
        const res= client1.insert("t_single_choice", {title: "单选题一",exer_id: 4});
        return res;
    }

    async addPromgram(){
        const client1=this.app.mysql.get("db1");
        const res= client1.insert("t_program", {title: "编程题一",exer_id: 4});
        return res;
    }
}

module.exports = ExercisesService;