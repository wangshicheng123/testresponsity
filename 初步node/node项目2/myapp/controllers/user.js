var User_model = require("../models/user_model.js");
var jwt = require("jsonwebtoken");
var secretkey = 'secretkey';

exports.reg = function (req, res, next) {
    res.render("reg");
}
exports.login = function (req, res, next) {
    res.render("login");
}

exports.do_reg = function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    // 理论上我们需要注册之前查询用户是否已经注册过了
    // 为了方便再次就不进行此项操作

    User_model.do_reg(name, pass, function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data.affectedRows > 0) {
            // res.render("login");
            res.json({ "message": "OK" });
        }
    });
}


//  在这里没有是否已经登陆，简约一些
exports.do_login = function (req, res, next) {

    var name = req.body.name;
    var pass = req.body.pass;
    var token="";
    User_model.do_login(name, pass, function (err, data) {
        // console.log(data);
        var userid=data[0].userid;
        if(data.length>0){
            req.session=data[0];
            token = jwt.sign({ username: name, pass: pass }, secretkey, { expiresIn: 60 * 8 });
            // 插入token到user表中去
            User_model.insertToken(token,userid,function(err,data){
                if(err){
                    console.log(err);
                }
                console.log(data);
            });

            res.json({
                "message":"登陆成功,请手动登陆首页",
                "token": token
            });
        }else{
            res.json({
                "message":"登陆失败，请重新登陆"
            });
        }
    });
}

exports.getMemberIndex=function(req,res,next){
    // 拿到session之后里面的用户信息可以服务端的全局进行使用
    console.log(req.session);

    res.render("memberIndex");
}
exports.getAdminIndex=function(req,res,next){
    res.render("adminIndex");
}