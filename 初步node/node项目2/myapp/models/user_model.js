var db=require("./db.js");

exports.do_reg=function(name,pass,callback){
    var sql ="insert into t_user(name,pass) values(?,?)";
    db.query(sql,[name,pass],callback);
}

exports.do_login=function(name,pass,callback){
    var sql="select * from t_user where name=? and pass=?"
    db.query(sql,[name,pass],callback);
}

exports.updateUserToken=function(token,userid,callback){
    var sql="update t_user set token=? where userid=?";
    db.query(sql,[token,userid],callback);
}

exports.do_viewFree=function(sqlUserid,callback){
    var sql="select * from t_user where userid = ?";
    db.query(sql,[sqlUserid],callback);
}

