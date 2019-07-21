'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async getBlogInfor() {
    const { ctx } = this;
    var results=await this.service.blog.getBlogInfor();
    ctx.body=results;
  }

  async deleteBlog(){
    const {ctx}=this;
    var res=await this.service.blog.deleteBlog();
    if(res.affectedRows>0){
      ctx.response.body={
        message: "删除文章成功"
      }
    }else{
      ctx.response.body={
        message: "删除文章失败"
      }
    }
  }

  async blogCategory(){
    var res=await this.service.blog.blogCategory();
    if(res.length>0){
      this.ctx.response.body=res;
    }else{
      this.ctx.response.body={
        message: "暂无此分类数据"
      }
    }
  }

  async blogTag(){
    const {ctx}= this;
    var res = await this.service.blog.blogTag();
    if(res.length>0){
      ctx.body=res;
    }else{
      ctx.body={
        message: "暂无此标签数据"
      }
    }
  }

  async blogComment(){
    const {ctx}=this;
    var res=await this.service.blog.blogComment();
    if(res.length>0){
      ctx.body=res;
    }else{
      ctx.body={
        message: "该文章暂无评论"
      }
    }
  }

  async deleteComment(){
    const {ctx}=this;
    var res=await this.service.blog.deleteComment();
    if(res.length>0){
      ctx.body=res;
    }else{
      ctx.body={
        message: "该评论删除失败"
      }
    }
  }
}

module.exports = BlogController;
