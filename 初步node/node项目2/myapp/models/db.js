var mysql = require("mysql");
// 创建一个连接池
var pool= mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "testManage"
});

exports.query=function(sql,params,callback){
    // 获取连接池对象
    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }

        // 进行连接之后的操作
        connection.query(sql,params,function(error,results,fields){
            if(error){
                throw error;
            }
            callback(error,results);  // 调用回调函数
            connection.release();  // 断开数据库连接
        })
    })
}