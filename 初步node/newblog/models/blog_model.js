var db=require("./db.js");

exports.getUserComments=function(userid,callback){
    var sql="select * from t_comments where COMMENTATOR=?";
    db.query(sql,[userid],callback);
}

exports.getUserBlogs=function(userid,callback){
    var sql="select * from t_blogs where WRITER=?";
    db.query(sql,[userid],callback);
}

exports.updateBlogCount=function(catalogid,callback){
    var sql ="update t_blog_catalogs set BLOG_COUNT=BLOG_COUNT+1 where CATALOG_ID= ?";
    db.query(sql,[catalogid],callback);
}

exports.getNextBlog=function(blogid,callback){
    var sql="SELECT * FROM t_blogs WHERE BLOG_ID> ? ORDER BY BLOG_ID LIMIT 1";
    db.query(sql,[blogid],callback);
}

exports.getPreBlog=function(blogid,callback){
    var sql="SELECT * FROM t_blogs WHERE BLOG_ID< ? ORDER BY BLOG_ID DESC LIMIT 1";
    db.query(sql,[blogid],callback);
}

exports.delete=function(blogid,callback){
    var sql="delete from t_blogs where BLOG_ID=?";
    db.query(sql,[blogid],callback);
}

exports.do_updateBlog=function(blogid,title, content,callback){
    var sql="update t_blogs set TITLE=?,CONTENT=? where BLOG_ID=?";
    db.query(sql,[title,content,blogid],callback);
}

exports.getBlogInfor=function(blogid,callback){
    var sql="select * from t_blogs where BLOG_ID=?";
    db.query(sql,[blogid],callback);
}

exports.addCatalog=function(userid,name,count,callback){
    var sql="insert into t_blog_catalogs(NAME,USER_ID,BLOG_COUNT) values(?,?,?)";
    db.query(sql,[name,userid,count],callback);
}

exports.insertBlog=function(userid,title,content,time, catalogid,callback){
    var sql="insert into t_blogs(CATALOG_ID,WRITER,TITLE,CONTENT,ADD_TIME) values(?,?,?,?,?)";
    db.query(sql,[catalogid,userid,title,content,time],callback);
}

exports.getBlogClass=function(id,callback){
    var sql="select * from t_blog_catalogs where USER_ID=?";
    db.query(sql,[id],callback);
}

exports.go_index=function(id,callback){
    var sql="select * from t_users,t_blogs,t_blog_catalogs where t_users.USER_ID=t_blogs.WRITER and t_blogs.CATALOG_ID=t_blog_catalogs.CATALOG_ID and t_blogs.WRITER=?"
    db.query(sql,[id],callback);
}