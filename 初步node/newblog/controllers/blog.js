var Blog_model=require("../models/blog_model.js");
var moment =require("moment");

exports.add=function(req,res,next){
    var userid=req.session.USER_ID;
    // 获取博客分类列表
    Blog_model.getBlogClass(userid,function(err,data){
        console.log(data);
        res.render("newBlog",{sess:req.session,catalogs: data});
    });
}

exports.do_add=function(req,res,next){

    var userid=req.session.USER_ID;
    var title=req.body.title;
    var content=req.body.content;
    var time=moment().format();
    var catalogid=req.body.catalog;

    Blog_model.insertBlog(userid,title,content,time, catalogid,function(err,data){
        // 
        if(data.affectedRows>0){
            res.redirect("/index");
        }
    });

}

exports.go_index=function(req,res,next){
    // 把首页的博客信息获取进行显示
    var userid=req.session.USER_ID;
    Blog_model.go_index(userid,function(err,data){
        if(err){throw err;}
        
        // 获取catalogs数据
        // console.log(data);(注意数据存在问题)
        Blog_model.getBlogClass(userid,function(err,data1){
            // console.log(data);
            res.render("index_logined",{sess: req.session, blogs: data, catalogs: data1}); 
        });
    });
}

exports.unlogin=function(req,res,next){
    req.session=null;
    res.redirect("/");
}