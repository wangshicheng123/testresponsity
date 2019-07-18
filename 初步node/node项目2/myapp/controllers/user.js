var User_model = require("../models/user_model.js");
var jwt = require("jsonwebtoken");
var mongodb = require("mongodb");
var mongoose = require("../models/mongoose.js");   // 连接mongodb数据库
var secretkey = 'secretkey';
var acl = require("acl");
var request = require("request");
var axios = require("axios");

// // 认证中间件
// var authentication = (req, res, next) => {
//     var userId = req.session.userId || ''

//     if (userId) {
//         acl.isAllowed(userId, req.path, '*')
//             .then(allowed => {
//                 if (allowed) {
//                     next()
//                 } else {
//                     next('权限不足')
//                 }
//             })
//             .catch((e) => {
//                 next(e.message)
//             })
//     } else {
//         next('请登录')
//     }

// }


// 可以通过req.session来判断用户是否已经注册，并提醒用户去登陆
exports.do_reg = async function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;

    // 验证用户是否已经注册过
    await new Promise((resolve,reject)=>{
        if(!name || !pass){
            res.json({
                message: '用户名或密码错误，请重新注册'
            })
        }

        var whereStr1 = { "name": name, "pass": pass };
        mongoose.connection.db.collection("users").find(whereStr1).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length > 0) {
                res.json({
                    message: "用户已经存在，请直接登陆"
                });
                reject();
            } else {
                resolve();
            }
        })
        
    });

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

    // 在mongodb数据库中插入数据
    // 使用readyState来判断mongodb数据库是否已经连接
    // if (mongoose.connection.readyState == 0) 
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

//  在这里没有验证是否已经登陆，简约一些
exports.do_login = async function (req, res1, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    var token="";
    var monUserid = "";
    var sqlUserid = "";

    // 一种方法：我们可以拿req.session.mongodbUserid进行jwt验证, 去判断用户是否已经登录了
    // session: {token: token, sqlUserid: sqlUserid, username: name, pass: pass, monUserid: monUserid }，
    // 二种方法： 直接拿req.body.token进行判断
    // 因为只有用户登录之后，我才会给vue端的state.token进行赋值
    await new Promise((resolve,reject)=>{
        if(req.body.token){
            res1.json({
                message: "您已经登陆了，无需重复登陆"
            });
        }else{
            resolve();
        }
    });

    // 初始化用户角色
    await new Promise((resolve, reject) => {
        acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_"));
        // console.log("acl2: ")
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
                token = jwt.sign({ username: name, pass: pass, userid: monUserid }, secretkey, { expiresIn: 60 * 8 });

                // 给用户添加角色
                //  其实在登陆的时候需要进行判断，如果用户是第一次进行登陆，我们就给其分配默认角色
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
                resolve();
            })
    });

    // 在mysql数据库中进行查询，获取用户userid;   
    await new Promise((resolve, reject) => {
        User_model.do_login(name, pass, function (err, data) {
            if (err) { throw err; }
            sqlUserid = data[0].userid;
            req.session = { token: token, sqlUserid: sqlUserid, username: name, pass: pass, monUserid: monUserid };   // 把存储在mongodb用户的数据存储在session中提供以后使用
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

// 分别拿到两个数据库中的userid, 一个id用于访问mongodb数据库权限认证，一个用于id访问mysql数据库
// 访问每一个接口的时候是否需要进行jwt认证，
// 其实不需要，因为没登陆他是没有任何权限的
// 判断接口是否存在权限
exports.do_viewFree = function (req, res, next) {
    // console.log(req.body);
    // console.log(req.session);
    // console.log(req.url);
    acl.isAllowed(req.session.monUserid, req.url, '*', function (err, allowed) {
        if (err) {
            console.log(err);
        }
        console.log(allowed);
        if (allowed) {
            User_model.do_viewFree(req.session.sqlUserid, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log(data[0]);
                res.json({
                    data: data[0],
                    status: 200,
                    message: "/video/viewFree post接口请求成功，数据正常"
                });
            });
        }
    });

}


exports.do_viewVip = function (req, res, next) {
    acl.isAllowed(req.session.monUserid, req.url, '*', function (err, allowed) {
        if (err) {
            console.log(err);
        }

        if (allowed) {
            User_model.do_viewFree(req.session.monUserid, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("数据正常");
                res.json({
                    data: data[0],
                    status: 200,
                    message: "/video/viewVip post接口请求成功，数据正常"
                });
            });
        } else {
            console.log("权限不足");
            res.json({
                status: 500,
                message: "/video/viewVip post接口请求失败，数据错误, 权限不足"
            });
        }

    })
}

exports.do_deleteVideo = function (req, res, next) {
    acl.isAllowed(req.session.monUserid, req.url, '*', function (err, allowed) {
        if (err) {
            console.log(err);
        }

        if (allowed) {
            User_model.do_viewFree(req.session.monUserid, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("数据正常");
                res.json({
                    data: data[0],
                    status: 200,
                    message: "/video/do_deleteVideo post接口请求成功，数据正常"
                });
            });
        } else {
            console.log("权限不足");
            res.json({
                status: 500,
                message: "/video/do_deleteVideo post接口请求失败，数据错误, 权限不足"
            });
        }

    })
}

exports.do_addVideo = function (req, res, next) {
    acl.isAllowed(req.session.monUserid, req.url, '*', function (err, allowed) {
        if (err) {
            console.log(err);
        }

        if (allowed) {
            User_model.do_viewFree(req.session.monUserid, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("数据正常");
                res.json({
                    data: data[0],
                    status: 200,
                    message: "/video/do_addVideo post接口请求成功，数据正常"
                });
            });
        } else {
            console.log("权限不足");
            res.json({
                status: 500,
                message: "/video/do_addVideo post接口请求失败，数据错误, 权限不足"
            });
        }

    })
}

// session: {token: token, sqlUserid: sqlUserid, username: name, pass: pass, monUserid: monUserid }，
// 不能随便就给添加角色，
// 应该是加入这个用户付费了，
exports.do_addVipRole = function (req, res, next) {
    acl.addUserRoles(req.session.monUserid, ["vip"], function (err) {
        if (err) {
            console.log(err);
            res.json({
                message: "/video/addVipRole post接口请求失败",
                status: 500
            });
        }
        res.json({
            message: "/video/addVipRole post接口请求成功",
            status: 200
        });
    });
}

exports.do_addAdminRole = function (req, res, next) {
    acl.addUserRoles(req.session.monUserid, ["admin"], function (err) {
        if (err) {
            console.log(err);
            res.json({
                message: "/video/do_addAdminRole post接口请求失败",
                status: 500
            });
        }
        res.json({
            message: "/video/do_addAdminRole post接口请求成功",
            status: 200
        });
    });
}

exports.do_deleteVipRole = function (req, res, next) {
    acl.removeUserRoles(req.session.monUserid, ["vip"], function (err) {
        if (err) {
            console.log(err);
            res.json({
                message: "/video/do_deleteVipRole post接口请求失败",
                status: 500
            });
        }
        res.json({
            message: "/video/do_deleteVipRole post接口请求成功",
            status: 200
        });
    });
}

exports.do_deleteAdminRole = function (req, res, next) {
    acl.removeUserRoles(req.session.monUserid, ["admin"], function (err) {
        if (err) {
            console.log(err);
            res.json({
                message: "/video/do_deleteAdminRole post接口请求失败",
                status: 500
            });
        }
        res.json({
            message: "/video/do_deleteAdminRole post接口请求成功",
            status: 200
        });
    });
}

// 使用axios模块进行服务端请求,正常拿到数据
exports.deal_oauth2Login_test = async function (req, res, next) {
    // 获取授权码
    var requestToken = req.query.code;
    console.log(requestToken);
    // 客户端ID(标识客户端身份)
    var clientID = "7b42a88712cd9fd024b9";
    // 客户端密匙
    var clientSecret = "cbebd4aedca1873d7cac0ae12327573ccf900e96";

    // 用于保存令牌
    var accessToken = "";

    var tokenResponse = await axios({
        method: "post",
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `code=${requestToken}`,
        headers: {
            accept: "application/json"
        }
    });
    accessToken = tokenResponse.data.access_token;
    console.log(`access token: ${accessToken}`);

    var result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`
        }
    });
    console.log(result.data);

    // res.json({
    //     message: "第三方登录成功",
    //     data: result.data
    // });

}


// request模块 最后一步已经拿到了access-token,但是获取不到用户的数据
exports.deal_oauth2Login = async function (req, res, next) {
    var code = req.query.code;
    console.log(code);
    var client_id = "7b42a88712cd9fd024b9";
    var client_secret = "cbebd4aedca1873d7cac0ae12327573ccf900e96";
    var access_token = "";
    await new Promise((resolve, reject) => {
        var url = "https://github.com/login/oauth/access_token";
        var requestData = { client_id: client_id, client_secret: client_secret, code: code };
        console.log(requestData);

        request.post({ url: url, formData: requestData }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            // console.log(body);
            var result = [];
            body.split("&").forEach((item) => {
                var it = item.split("=")[1];
                result.push(it);
            });
            access_token = result[0];
            resolve();
        });
    });
    await new Promise((resolve, reject) => {
        var url1 = "https://github.com/user";
        console.log("测试输出：" + access_token);
        var str = "https://api.github.com/user?access_token=" + access_token
        request(str, function (err, res, body) {
            console.log(res.data);
        });
    });

}
