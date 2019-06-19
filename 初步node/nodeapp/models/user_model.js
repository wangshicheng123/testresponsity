var db=require("./db.js");

exports.insert_data=function(name,pass,callback){
    var sql="insert into user(uname,pass,flag) values(?,?,0)";
    console.log(sql);
    db.query(sql,[name,pass],callback);
}

exports.checkLogin=function(name,pass,callback){
    var sql="select * from user where uname=? and pass= ?";
    db.query(sql,[name,pass],callback);
}




/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myblog'
});

connection.connect();

exports.insert_data = function (name,pass,callback) {
    var sql=`insert into user values(null,'${name}','${pass}',0)`;
    // console.log(sql);
    // console.log("insert into user values(null,'qwerty','1234',0)");
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        callback(error,results)
        connection.end();
    });

}*/