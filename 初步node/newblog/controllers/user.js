var User_model=require("../models/user_model.js");

exports.login=function(req,res,next){
    res.render("login");
}

exports.do_login=function(req,res,next){
    // console.log(req.body);
    var name=req.body.email;
    var pass=req.body.pwd;
    User_model.login(name,pass,function(err,data){
        if(data.length>0){
            req.session=data[0];
            res.redirect("/index");
        }
    });
}

exports.reg=function(req,res,next){
    res.render("reg"); // 包含了writeHead和end两部分 
}

exports.do_reg = function (req, res, next) {
    var pass = req.body.pwd;
    var name = req.body.email;
    User_model.do_reg(name, pass, function (err, data) {
        if (err) throw err;

        if (data.affectedRows > 0) {
            res.redirect("/login");
        }
    });
}
exports.checkname = function (req, res, next) {

    var name = req.body.value;
    User_model.checkname(name, function (err, data) {
        if (err) {
            throw err;
        }

        if (data.length > 0) {
            res.end("success");
        } else {
            res.end("error");
        }

    });
}