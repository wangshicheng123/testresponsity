var express = require('express');
var router = express.Router();
var User = require("../controllers/user.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取注册登录页面
// router.get("/reg",User.reg);
// router.get("/login",User.login);

// 处理注册登录逻辑
router.post("/reg", User.do_reg);
router.post("/login",User.do_login);


// （目标）是可以根据用户的角色得到不同的页面（so hard for me）
router.get("/getMemberIndex", User.getMemberIndex);
router.get("/getAdminIndex",User.getAdminIndex);

router.post("/postMemberData",User.postMemberData);

module.exports = router;


/**
 * 
 * 注意我们不是把页面写在node的服务端，而是应该在
 * vue的前把注册登录页面写好，
 * 我们node只负责提供数据（其实不是，可以先简单的这样理解），
 * 在解决了跨域问题之后，我们可以在前端vue做axios异步请求，
 * 
 * 
 * 目前只看注册和登陆不要向其他的:
 * 注册：
 * 1：vue端写好注册页面
 * 2：在vue端做axios异步请求（解决了跨域问题的前提之下），进行注册流程
 * 3：node服务端接收到前端传来的用户注册信息（进行验证注册流程，成功后把用户的信息
 *    以及token字段必须提前准备好,先存储到mysql数据的user表中，便于登陆的时候使用）
 * 4：开始写登陆界面，
 * 5：把登陆信息发到node后台进行处理 
 * 6: 处理方式就是jwt验证登陆，验证成功以后生成token的具体值（更新user表），把token的值返回到vue端进行本地化存储
 * 7：然后开始做node_acl权限分发管理（设计mongodb数据库，连接数据库）
 * 8: 我们使用node_acl做权限分发的时候，实在注册的时候就给用户一个角色（应该是）
 * 9：
 * 
 */