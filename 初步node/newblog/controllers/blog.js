var Blog_model = require("../models/blog_model.js");
var moment = require("moment");

exports.manageComments=function(req,res,next){
    // 拿到所有的评论
    var userid=req.session.USER_ID;
    Blog_model.getUserComments(userid,function(err,data){
        if(err){
            console.log(err);
        }
        console.log(data);
    });
}

exports.manageBlog=function(req,res,next){
    // 获取当前用户的userid
    var userid=req.session.USER_ID;

    Blog_model.getUserBlogs(userid,function(err,data){
        if(err){
            console.log(err);
        }
        res.render("manageBlog",{blogs: data});
    });
}

exports.viewPost = function (req, res, next) {
    var blogid = req.query.bid;

    let p1 = new Promise((resolve, reject) => {
        Blog_model.getBlogInfor(blogid, function (err, data) {
            if (err) {
                console.log(err);
            }
            resolve(data[0]);
        });
    });

    let p2 =new Promise((resolve, reject)=>{
        Blog_model.getPreBlog(blogid,function(err,data){
            if(err){
                console.log(err);
            }
            resolve(data[0]);
        });
    });

    
    let p3 =new Promise((resolve, reject)=>{
        Blog_model.getNextBlog(blogid,function(err,data){
            if(err){
                console.log(err);
            }
            resolve(data[0]);
        });
    });

    Promise.all([p1,p2,p3]).then((data)=>{
        // 在已知blogid的情况下，可以循环判断是否符合条件
        let maindata ,predata,nextdata;
        data.forEach((item)=>{
            if(item.BLOG_ID==blogid){
                maindata=item;
            }
            if(item.BLOG_ID<blogid){
                predata=item;
            }
            if(item.BLOG_ID>blogid){
                nextdata=item;
            }
        });
        res.render("viewPost_logined",{maindata,predata,nextdata});
    });
}

exports.delete = function (req, res, next) {
    var blogid = req.query.bid;
    Blog_model.delete(blogid, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
        if (data.affectedRows > 0) {
            res.redirect("/index");
        }
    });
}

exports.do_updateBlog = function (req, res, next) {
    var blogid = req.body.hid;
    var title = req.body.title;
    var content = req.body.content;
    // var time=moment().format();
    // var catalogid=req.body.catalog;

    Blog_model.do_updateBlog(blogid, title, content, function (err, data) {
        if (err) {
            console.log(err);
        }

        if (data.affectedRows > 0) {
            res.redirect("/index");
        }
    });
}

exports.updateBlog = function (req, res, next) {
    var blogid = req.query.bid
    Blog_model.getBlogInfor(blogid, function (err, data) {
        if (err) {
            console.log(err);
        }
        res.render("updateBlog", { sess: req.session, blog: data[0] });
    });

}

exports.do_catalog = function (req, res, next) {
    var userid = req.session.USER_ID;
    var name = req.body.name;
    var count = 0;

    Blog_model.addCatalog(userid, name, count, function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data.affectedRows > 0) {
            res.redirect("/catalog");
        }
    });

}

exports.catalog = function (req, res, next) {
    var userid = req.session.USER_ID;
    // 获取博客分类列表
    Blog_model.getBlogClass(userid, function (err, data) {
        console.log(data);
        // res.render("newBlog",{sess:req.session,catalogs: data});
        res.render("blogCatalogs", { sess: req.session, catalogs: data });
    });
}

exports.add = function (req, res, next) {
    var userid = req.session.USER_ID;
    // 获取博客分类列表
    Blog_model.getBlogClass(userid, function (err, data) {
        console.log(data);
        res.render("newBlog", { sess: req.session, catalogs: data });
    });
}

exports.do_add = function (req, res, next) {
    var userid = req.session.USER_ID;
    var title = req.body.title;
    var content = req.body.content;
    var time = moment().format();
    var catalogid = req.body.catalog;
    // 插入博客数据
    Blog_model.insertBlog(userid, title, content, time, catalogid, function (err, data) {
        // 
        if (data.affectedRows > 0) {
            // 更新博客条数
            Blog_model.updateBlogCount(catalogid,function(err,data){
                if(err){
                    console.log(err);
                }
                if(data.affectedRows>0){
                    res.redirect("/index");
                }
            });
        }
    });

}

exports.go_index = function (req, res, next) {
    // 把首页的博客信息获取进行显示
    var userid = req.session.USER_ID;
    Blog_model.go_index(userid, function (err, data) {
        if (err) { throw err; }

        // 获取catalogs数据
        // console.log(data);(注意数据存在问题)
        Blog_model.getBlogClass(userid, function (err, data1) {
            // console.log(data);
            res.render("index_logined", { sess: req.session, blogs: data, catalogs: data1 });
        });
    });
}

exports.unlogin = function (req, res, next) {
    req.session = null;
    res.redirect("/");
}