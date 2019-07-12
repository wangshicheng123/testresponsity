var express = require('express');
var router = express.Router();
var User = require("../controllers/user.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取注册登录页面
router.get("/reg",User.reg);
router.get("/login",User.login);

// 处理注册登录逻辑
router.post("/reg", User.do_reg);
router.post("/login",User.do_login);


// （目标）是可以根据用户的角色得到不同的页面（so hard for me）
router.get("/getMemberIndex", User.getMemberIndex);
router.get("/getAdminIndex",User.getAdminIndex);



module.exports = router;
