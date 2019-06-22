var db=require("./db.js");

exports.insertBlog=function(userid,title,content,time, catalogid,callback){
    var sql="insert into t_blogs(CATALOG_ID,WRITER,TITLE,CONTENT,ADD_TIME) values(?,?,?,?,?)";
    db.query(sql,[catalogid,userid,title,content,time],callback);
}

exports.getBlogClass=function(id,callback){
    var sql="select * from t_blog_catalogs where USER_ID=?";
    db.query(sql,[id],callback);
}

exports.go_index=function(id,callback){
    var sql="SELECT * FROM t_users, t_blogs, t_blog_catalogs WHERE t_users.USER_ID=? AND t_users.USER_ID=t_blogs.WRITER AND t_users.USER_ID=t_blog_catalogs.USER_ID";
    db.query(sql,[id],callback);
}