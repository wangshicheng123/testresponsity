var User_model = require("../models/user_model.js");
var jwt = require("jsonwebtoken");
var secretkey = 'secretkey';

exports.login = function (req, res, next) {
    res.render("login");
}

exports.do_login = function (req, res, next) {
    // console.log(req.body);
    var name = req.body.email;
    var pass = req.body.pwd;
    User_model.login(name, pass, function (err, data) {
        if (data.length > 0) {
            var token = jwt.sign({ username: name }, secretkey, { expiresIn: 60 * 8 });

            // 登陆之后不着急跳转页面，
            //  首先应该判断一下用户的角色，在进一步进行跳转

            console.log(token);
            req.session = data[0];
            res.redirect("/index");
        }
    });
}

exports.reg = function (req, res, next) {
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



// 测试接口（post请求）
// 返回第一次的登陆请求
exports.testLogin = function (req, res, next) {
    var name = req.body.value;
    var token = jwt.sign({ username: name }, secretkey, { expiresIn: 60 * 8 });
    res.send({
        message: "OK",
        tok: token
    });
}

// 返回登陆页面
exports.test = function (req, res, next) {
    res.render("me");
}

// 返回post请求的结果
exports.testToken = function (req, res, next) {
    var token = req.body.value;
    // let token = req.body.token || req.query.token || req.headers.token;
    // console.log(token);

    // 验证是否是当前用户 
    jwt.verify(token, secretkey, function (err, decode) {
        if (err) {
            res.json({
                message: 'token过期，请重新登录，有错',
                resultCode: '403'
            })
        }
        else{
            res.json({
                message: "成功返回页面",
                tok: token
            });
        }
    })


}

