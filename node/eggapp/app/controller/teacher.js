'use strict';

const Controller = require("egg").Controller;

class TeacherController extends Controller {
    async getAllTeacher() {
        const { ctx } = this;
        const infor = await this.service.teacher.getAllTeacher();
        ctx.body = infor;
    }

    async addTeacher() {
        const { ctx } = this;
        const res = await this.service.teacher.addTeacher();
        if (res.affectedRows > 0) {
            ctx.body = {
                message: "添加教师成功"
            }
        } else {
            ctx.response.body = {
                message: "添加教师失败"
            }
        }

    }

    async deleteTeacher() {
        const res = await this.service.teacher.deleteTeacher();
        if(res.affectedRows>0){
            this.ctx.response.body={
                message: "删除教师成功"
            }
        }else{
            this.ctx.response.body={
                message: "删除教师失败"
            }
        }
    }
}

module.exports = TeacherController;