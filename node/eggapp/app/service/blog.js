const Service = require('egg').Service;
 
class BlogService extends Service {
  async getBlogInfor() {

    const client1=this.app.mysql.get("db2");
 
    const result = client1.select('t_blog');
    return result;
  }

  async deleteBlog(){
    const {ctx}=this;
    const client1=ctx.app.mysql.get("db2");
    const res=client1.delete("t_blog",{blog_id: 2});
    return res;
  }

  async blogCategory(){
    const client1=this.ctx.app.mysql.get("db2");
    const res = client1.select("t_blog",{
      where: {
        cate_id: 1
      }
    });
    return res;
  }

  async blogTag(){
    const client1 =this.app.mysql.get("db2");
    const res=client1.query("SELECT * from t_blog, t_blog_tag, t_tag where t_blog.blog_id=t_blog_tag.blog_id and  t_blog_tag.tag_id= t_tag.tag_id and t_tag.tag_id=2");
    return res;
  }

  async blogComment(){
    const client1=this.app.mysql.get("db2");
    const res=client1.select("t_comment",{blog_id: 3});
    return res;
  }
}
 
module.exports = BlogService;