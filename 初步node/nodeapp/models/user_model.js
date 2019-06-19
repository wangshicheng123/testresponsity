var db=require("./db.js");

exports.insert_data=function(name,pass,flag=0,callback){
    var sql="insert into user(uname,pass,flag) values(?,?,?)";
    db.query(sql,[name,pass,flag],callback);
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