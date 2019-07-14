var User_model = require("../models/user_model.js");
var jwt = require("jsonwebtoken");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var secretkey = 'secretkey';
var acl = require("acl");


// 如何判断用户是否已经注册过了呢，
// 我们也可以通过req.session来判断
// exports.do_reg = function (req, res, next) {
//     var name = req.body.name;
//     var pass = req.body.pass;
// console.log(name, pass);
// 理论上我们需要注册之前查询用户是否已经注册过了
// 为了方便再次就不进行此项操作

// User_model.do_reg(name, pass, function (err, data) {
//     if (err) {
//         console.log(err);
//         res.json({
//             "message": "reg的post请求失败",
//             "status": 404
//         });
//     }
//     if (data.affectedRows > 0) {
// *********************
// 后期把这段代码进行模块化
//**********************
// var acl=require("acl");

// 注意如果使用mongodb连接数据库的时候会出现错误，所欲我们使用mongoose连接数据库
// 感觉下面几行代码只用一次就行，把数据库进行创建，
// 插入数据可以使用mongodb连接数据库
// mongoose.connect("mongodb://127.0.0.1:27017/testManage", { useNewUrlParser: true }).then(function () {
// acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));
// console.log();
// console.log("连接数据库之后：" + mongoose.connection.readyState);
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
// var userObj = { name: name, pass: pass, token: "" };
// 虽然写法很怪，但是也可以进行修改
// mongoose.connection.db.collection("users").insertOne(userObj, function (err, result) {
//                     if (err) {
//                         throw err;
//                     }
//                     console.log("用户信息插入成功");
//                     res.json({
//                         "message": "reg接口,post请求成功，注册成功",
//                         "status": 200
//                     });
//                 });

//             });
//         }
//     });
// }


// 可以通过req.session来判断用户是否已经注册，并提醒用户去登陆
exports.do_reg = async function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;

    // 把用户注册信息插入到mysql数据库中
    await new Promise((resolve, reject) => {
        User_model.do_reg(name, pass, function (err, data) {
            if (err) {
                console.log(err);
                res.json({
                    "message": "reg的post请求失败",
                    "status": 404
                });
            }
            if (data.affectedRows > 0) {
                resolve();
            }
        })
    });

    // 连接mongodb数据库
    await new Promise((resolve, reject) => {
        // 使用readyState来判断mongodb数据库是否已经连接
        if (mongoose.connection.readyState == 0) {
            mongoose.connect("mongodb://127.0.0.1:27017/testManage", { useNewUrlParser: true }).then(function () {
                // acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));
                resolve();
            });
        } else {
            resolve();
        }
    });

    // 在mongodb数据库中插入数据
    await new Promise((resolve, reject) => {
        var userObj = { name: name, pass: pass, token: "" };
        mongoose.connection.db.collection("users").insertOne(userObj, function (err, result) {
            if (err) {
                throw err;
            }
            res.json({
                "message": "reg接口,post请求成功，注册成功",
                "status": 200
            });
            resolve();
        });
    });
}

//  在这里没有验证是否已经登陆，简约一些（如果要判断，可以直接那req.session进行判断）
exports.do_login = async function (req, res1, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    var token = "";
    var monUserid = "";
    var sqlUserid = "";

    // 首先连接mongodb数据库
    await new Promise((resolve, reject) => {
        if (mongoose.connection.readyState == 0) {
            mongoose.connect("mongodb://127.0.0.1:27017/testManage", { useNewUrlParser: true }).then(function () {
                acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));
                acl.allow([
                    {
                        roles: 'member',
                        allows: [
                            { resources: '/video/viewFree', permissions: '*' },
                        ],
                    },
                    {
                        roles: 'vip',
                        allows: [
                            { resources: '/video/viewVip', permissions: '*' },
                        ],
                    },
                    {
                        roles: 'admin',
                        allows: [
                            { resources: '/video/delete', permissions: '*' },
                            { resources: '/video/add', permissions: '*' },
                        ],
                    }
                ])
                acl.addRoleParents('vip', 'member')// teacher角色拥有student角色所有的权限
                acl.addRoleParents('admin', 'vip')// admin角色拥有teacher角色所有的权限
                resolve();
            });
        } else {
            acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));
            acl.allow([
                {
                    roles: 'member',
                    allows: [
                        { resources: '/video/viewFree', permissions: '*' },
                    ],
                },
                {
                    roles: 'vip',
                    allows: [
                        { resources: '/video/viewVip', permissions: '*' },
                    ],
                },
                {
                    roles: 'admin',
                    allows: [
                        { resources: '/video/delete', permissions: '*' },
                        { resources: '/video/add', permissions: '*' },
                    ],
                }
            ])
            acl.addRoleParents('vip', 'member')// teacher角色拥有student角色所有的权限
            acl.addRoleParents('admin', 'vip')// admin角色拥有teacher角色所有的权限
            resolve();
        }
    })

    // 在mongodb数据库中是否存在这个登陆的用户
    await new Promise((resolve, reject) => {
        var whereStr1 = { "name": name, "pass": pass };
        mongoose.connection.db.collection("users").find(whereStr1).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            monUserid = result[0]._id;   
            var _id = result[0]._id.toString();    // _id是object 类型，转化为string类型

            if (result.length > 0) {
                req.session = result[0];   // 把存储在mongodb用户的数据存储在session中提供以后使用
                token = jwt.sign({ username: name, pass: pass, userid: monUserid }, secretkey, { expiresIn: 60 * 8 });

                // 给用户添加角色
                //  其实在登陆的时候需要进行判断，
                // 如果用户是第一次进行登陆，我们就给其分配默认角色
                // 如果是已经是老用户了，我们不进行分配角色，这时候应该如何进行判断
                // 我们可以使用： hasRole这个方法进行判断**********************
                // 其实下面这个方法不影响老用户的角色
                acl.addUserRoles(_id, ["member"]);

                resolve();
            } else {
                res1.json({
                    "message": "登陆失败，请重新登陆，用户名或者密码错误",
                    "toekn": ""
                });
                reject();
            }
        })
    });

    // 在mongodb数据库中更新token字段
    await new Promise((resolve, reject) => {
        mongoose.connection.db.collection("users").updateOne(
            { "_id": monUserid },
            { $set: { "token": token } },
            function (err, res) {
                if (err) { throw err }
                console.log(res);
                resolve();
            })
    });

    // 在mysql数据库中进行查询，获取用户userid;   
    await new Promise((resolve, reject) => {
        User_model.do_login(name, pass, function (err, data) {
            if (err) { throw err; }
            sqlUserid = data[0].userid;
            resolve();
        })
    })

    // 更新mysql数据库中user表中的token字段
    await new Promise((resolve, reject) => {
        User_model.updateUserToken(token, sqlUserid, function (err, data) {
            if (err) {
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
                resolve();
            }
        });
    });
}


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