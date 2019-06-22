var Blog_model=require("../models/blog_model.js");

exports.go_index=function(req,res,next){
    // 把首页的博客信息获取进行显示
    var id=req.session.USER_ID;
    Blog_model.go_index(id,function(err,data){
        if(err){throw err;}
        // console.log(data);
        res.render("index_logined",{sess: req.session, blogs: data});
    });
}

exports.unlogin=function(req,res,next){
    req.session=null;
    res.redirect("/");
}