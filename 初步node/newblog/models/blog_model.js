var db=require("./db.js");

exports.go_index=function(id,callback){
    var sql="SELECT * FROM t_users, t_blogs, t_blog_catalogs WHERE t_users.USER_ID=? AND t_users.USER_ID=t_blogs.WRITER AND t_users.USER_ID=t_blog_catalogs.USER_ID";
    db.query(sql,[id],callback);
}