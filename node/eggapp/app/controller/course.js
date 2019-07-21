'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
    async getCourseInfor() {
        const { ctx } = this;
        var results = await this.service.course.getCourseInfor();
        if (results.length > 0) {
            ctx.body = results;
        } else {
            ctx.body = {
                message: "没有课程"
            }
        }
    }

    async addCourse(){
        var res=await this.service.course.addCourse();
        if(res.affectedRows>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "添加课程失败"
            }
        }
    }

    async deleteCourse(){
        var res=await this.service.course.deleteCourse();
        if(res.affectedRows>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "删除课程失败"
            }
        }
    }

    async preCourse(){
        var res=await this.service.course.preCourse();
        if(res.length>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "该课程无前置课程"
            }
        }
    }

    async courseCategory(){
        var res=await this.service.course.courseCategory();
        if(res.length>0){
            this.ctx.body=res;
        }else
        this.ctx.body={
            message: "该分类中没有课程"
        }
    }

    async courseComment(){
        var res= await this.service.course.courseComment();
        if(res.length>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "文章暂无评论"
            }
        }
    }

    async deleteCourseComment(){
        var res= await this.service.course.deleteCourseComment();
        if(res.length>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "文章评论删除失败"
            }
        }
    }

    async courseUpdate(){
        var res= await this.service.course.courseUpdate();
        if(res.affectedRows>0){
            this.ctx.body=res;
        }else{
            this.ctx.body={
                message: "更新课程相关信息失败"
            }
        }
    }
}

module.exports = CourseController;
