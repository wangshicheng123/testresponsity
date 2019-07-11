var express = require('express');
var jwt = require("jsonwebtoken");
var User = require("../controllers/user.js");
var Blog = require("../controllers/blog.js");

var router = express.Router();


var secretkey = 'secretkey';

// 使用session和next()方法配合控制用户是否登陆跳转不同的页面
function checkLogin(req, res, next) {
  // console.log(req.session);
  // 当session不为空,说明用户已经登陆，跳转到用户博客的首页
  /*console.log(req.session);
  if(req.session){
    next();
  }
  else{
    // 用户的session为空，跳转到游客index页面
    res.redirect("/");
  }*/

  // console.log(req.session.email);
  // 不能用req.session进行判断，否则会出错 
  // console.log(!!{}); // true
  // console.log(!![]); // true
  // console.log(!!null);  // false
  // console.log(!!undefined);  //false
  if (req.session.ACCOUNT) {
    next();
  } else {
    res.redirect("/");
  }

}


// router.use(function (req, res, next) {
//   console.log(req.url);
//   if (req.url != '/login' && req.url != '/reg') {
//     //token可能存在post请求和get请求
//     let token = req.body.token || req.query.token || req.headers.token;
//     console.log(token);
//     jwt.verify(token, secretkey, function (err, decode) {
//       if (err) {
//         res.json({
//           message: 'token过期，请重新登录，有错',
//           resultCode: '403'
//         })
//       } else {
//         next();
//       }
//     })
//   } else {
//     next();
//   } 
// });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// 登陆之后进入首页部分（session检查是否登陆）
router.get("/index", checkLogin);
router.get("/index", Blog.go_index);

// 登陆部分
router.get("/login", User.login);
router.post("/login", User.do_login);

// 注册部分
router.get("/reg", User.reg);
router.post("/reg", User.do_reg);
router.post("/checkname", User.checkname);

// 退出登录
router.get("/unlogin", Blog.unlogin);

// 发表博客
router.get("/add", Blog.add);
router.post("/add", Blog.do_add);

// 分类管理
router.get("/catalog", Blog.catalog);
router.post("/addBlogCatalog", Blog.do_catalog);

// 更新博客文章
router.get("/update", Blog.updateBlog);
router.post("/update", Blog.do_updateBlog);

// 删除博客文章
router.get("/del", Blog.delete);

// 预览博客全文
router.get("/viewPost", Blog.viewPost);

// 管理文章（所有）
router.get("/manageBlog", Blog.manageBlog);

// 管理网友留言
router.get("/manageComments", Blog.manageComments);


// //测试路由（post testLogin）
router.post("/testLogin",User.testLogin);  // 发起登陆请求
router.get("/testLogin",User.test);  // 获取登陆页面
router.post("/testToken",User.testToken);  // 表单提交数据请求

module.exports = router;
