var express = require('express');
var router = express.Router();
var users=require("../controllers/users.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/reg",users.reg);
router.post("/do_reg",users.do_reg);

router.get("/login",users.login);
router.post("/login",users.do_login);

module.exports = router;
