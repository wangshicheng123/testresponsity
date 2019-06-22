var db=require("./db.js");

exports.login=function(name,pass,callback){
    var sql="select * from t_users where ACCOUNT=? and PASSWORD=?";
    db.query(sql,[name,pass],callback);
}

exports.do_reg=function(name,pass,callback){
    var sql="insert into t_users(ACCOUNT,PASSWORD) values(?,?)";
    db.query(sql,[name,pass],callback);
}

exports.checkname=function(name,callback){
    var sql="select * from t_users where ACCOUNT=?";
    db.query(sql,[name],callback);
}