'use strict';

const Controller = require('egg').Controller;

class ExercisesController extends Controller {
    async insertExercisesInfor() {
        const { ctx } = this;
        var results = await this.service.exercises.insertExercisesInfor();
        if (results.affectedRows > 0) {
            ctx.body = results;
        } else {
            ctx.body = {
                message: "插入套题的基本信息失败"
            }
        }
    }

    async addMultiple(){
        const { ctx } = this;
        var res=await this.service.exercises.addMultiple();
        if (res.affectedRows > 0) {
            ctx.body = res;
        } else {
            ctx.body = {
                message: "插入套题下的多选题基本信息失败"
            }
        }
    }

    async addSingle(){
        const { ctx } = this;
        var res=await this.service.exercises.addSingle();
        if (res.affectedRows > 0) {
            ctx.body = res;
        } else {
            ctx.body = {
                message: "插入套题下的单选题基本信息失败"
            }
        }
    }

    async addPromgram(){
        const { ctx } = this;
        var res=await this.service.exercises.addPromgram();
        if (res.affectedRows > 0) {
            ctx.body = res;
        } else {
            ctx.body = {
                message: "插入套题下的编程题基本信息失败"
            }
        }
    }
}

module.exports = ExercisesController;
