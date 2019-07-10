var db=require("./db.js");


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
    // var sql="SELECT * FROM t_users, t_blogs, t_blog_catalogs WHERE t_users.USER_ID=? AND t_users.USER_ID=t_blogs.WRITER AND t_users.USER_ID=t_blog_catalogs.USER_ID";
    var sql="select * from t_users,t_blogs,t_blog_catalogs where t_users.USER_ID=t_blogs.WRITER and t_blogs.CATALOG_ID=t_blog_catalogs.CATALOG_ID and t_blogs.WRITER=?"
    db.query(sql,[id],callback);
}