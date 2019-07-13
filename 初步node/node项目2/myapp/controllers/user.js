var User_model = require("../models/user_model.js");
var jwt = require("jsonwebtoken");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var secretkey = 'secretkey';
var acl = require("acl");

exports.do_reg = function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    // console.log(name, pass);
    // 理论上我们需要注册之前查询用户是否已经注册过了
    // 为了方便再次就不进行此项操作

    User_model.do_reg(name, pass, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                "message": "reg的post请求失败",
                "status": 404
            });
        }
        if (data.affectedRows > 0) {
            // *********************
            // 后期把这段代码进行模块化
            //**********************
            // var acl=require("acl");

            // 注意如果使用mongodb连接数据库的时候会出现错误，所欲我们使用mongoose连接数据库
            // 感觉下面几行代码只用一次就行，把数据库进行创建，
            // 插入数据可以使用mongodb连接数据库
            mongoose.connect("mongodb://127.0.0.1:27017/testManage").then(function () {
                acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));

                // acl.allow([
                //     {
                //         roles: 'member',
                //         allows: [
                //             { resources: '/video/viewFree', permissions: '*' },
                //         ],
                //     },
                //     {
                //         roles: 'vip',
                //         allows: [
                //             { resources: '/video/viewVip', permissions: '*' },
                //         ],
                //     },
                //     {
                //         roles: 'admin',
                //         allows: [
                //             { resources: '/video/delete', permissions: '*' },
                //             { resources: '/video/add', permissions: '*' },
                //         ],
                //     }
                // ])
                // acl.addRoleParents('vip', 'member')// teacher角色拥有student角色所有的权限
                // acl.addRoleParents('admin', 'vip')// admin角色拥有teacher角色所有的权限

                // 注意我们在注册的时候不分配角色，在登陆的时候进行分配
                var userObj = { name: name, pass: pass, token: "" };
                // 虽然写法很怪，但是也可以进行修改
                mongoose.connection.db.collection("users").insertOne(userObj, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log("用户信息插入成功");
                    res.json({
                        "message": "reg接口,post请求成功，注册成功",
                        "status": 200
                    });
                });

            });
        }
    });
}

//  在这里没有是否已经登陆，简约一些
exports.do_login = function (req, res1, next) {

    var name = req.body.name;
    var pass = req.body.pass;
    var token = "";
    mongoose.connect("mongodb://127.0.0.1:27017/testManage").then(function () {
        acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));

        var whereStr1 = { "name": name, "pass": pass };
        mongoose.connection.db.collection("users").find(whereStr1).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            var userid = result[0]._id;

            if (result.length > 0) {
                req.session = result[0];   // 把用户的数据存储在session中提供以后使用
                token = jwt.sign({ username: name, pass: pass, userid: userid }, secretkey, { expiresIn: 60 * 8 });

                // 先更新mongodb表
                var whereStr = { "_id": userid };
                var updateStr = { $set: { "token": token } };
                mongoose.connection.db.collection("users").updateOne(whereStr, updateStr, function (err, res) {
                    if (err) { throw err }
                    console.log("文档更新成功");
                    // console.log(res);

                    // 在进行一次查询
                    User_model.do_login(name, pass, function (err, data) {
                        var sqlid=data[0].userid;
                        //后更新mysql数据库
                    User_model.updateUserToken(token, sqlid, function (err, data) {
                        if (err) {
                            console.log("错误");
                            console.log(err);
                            res1.json({
                                "message": "登陆失败，请重试",
                                "token": ""
                            });
                        } else {
                            res1.json({
                                "message": "/login,post接口登陆成功",
                                "token": token
                            });
                        }
                    });
                    })

                })

            } else {
                res1.json({
                    "message": "登陆失败，请重新登陆，用户名或者密码错误",
                    "toekn": ""
                });
            }
        });
    })
}







// User_model.do_login(name, pass, function (err, data) {
//     var userid = data[0].userid;
//     if (data.length > 0) {
//         req.session = data[0];   // 把用户的数据存储在session中提供以后使用
//         token = jwt.sign({ username: name, pass: pass, userid: userid }, secretkey, { expiresIn: 60 * 8 });
//         // 插入token到user表中去
//         User_model.updateUserToken(token, userid, function (err, data) {
//             if (err) {
//                 console.log(err);
//                 req.json({
//                     "message": "登陆失败，请重试",
//                     "token": ""
//                 });
//             } else {
//                 res.json({
//                     "message": "/login,post接口登陆成功",
//                     "token": token
//                 });
//             }
//         });
//     } else {
//         res.json({
//             "message": "登陆失败，请重新登陆，用户名或者密码错误",
//             "toekn": ""
//         });
//     }
// });





exports.getMemberIndex = function (req, res, next) {
    // 拿到session之后里面的用户信息可以服务端的全局进行使用
    // console.log(req.session);

    res.render("memberIndex");
}
exports.getAdminIndex = function (req, res, next) {
    res.render("adminIndex");
}

exports.postMemberData = function (req, res, next) {
    // var age=req.body.age;
    // var weight=req.body.weight;
    // console.log(req.body);
    var token = req.body.token;
    // 验证是否是当前用户 
    jwt.verify(token, secretkey, function (err, decode) {
        if (err) {
            res.json({
                message: 'token过期，请重新登录，有错',
                resultCode: '403'
            })
        }
        else {
            res.json({
                message: "成功返回页面",
                tok: token
            });
        }
    })
}