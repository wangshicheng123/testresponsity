var User_model=require("../models/user_model.js");

exports.reg = function (req, res, next) {
    res.render("reg");
}

exports.do_reg = function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.password;

    // 数据插入数据库操作
    User_model.insert_data(name,pass,function(error,data){
        // console.log(data);
        if(data.affectedRows>0){
            res.redirect("/login");
        }
    });
}

exports.login=function(req,res,next){
    res.render("login");
}

exports.do_login=function(req,res,next){
    var name = req.body.name;
    var pass =req.body.password;

    User_model.checkLogin(name,pass, function(error,data){
        console.log(data);
    });
}