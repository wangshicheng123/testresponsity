var User_model=require("../models/user_model.js");

exports.reg = function (req, res, next) {
    res.render("reg");
}

exports.do_reg = function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.password;

    // 数据插入数据库操作
    User_model.insert_data(name,pass,function(error,data){
        console.log(data);
    });
}