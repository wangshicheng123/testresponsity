var http= require("http");
var fs=require("fs");
var url=require("url");
var formidable=require("formidable");
var util=require("util");

http.createServer(function(req,res){
    // console.log(req);
    let url=req.url;
    switch(url){
        case "/":
            goIndex(res);
            break;
        case "/upload":
            goUpload(req,res);
            break;
        default:
            res.writeHead(200,{"Content-type":"text/html"});
            res.end("<h1 style='text-align: center;'>no pages</h1>");
    }
}).listen(3000,function(){
    console.log("server start at 3000");
    // console.log(__dirname);
    // console.log(url.parse("/index.html?name=sdf"));
});

function goUpload(req,res){

    var form = new formidable.IncomingForm();
    // 改变上传文件的路径
    form.uploadDir=__dirname+"/upload/";

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');

      var oldName=files.myFile.path;
      var newName=__dirname+"\\upload\\"+files.myFile.name;
      // 改变一下文件的名称
      fs.rename(oldName,newName,function(err){
          if(err){throw err;}
          res.end(util.inspect({fields: fields, files: files}));
      })


    });
}

function goIndex(res){
    // 把index.html文件返回到页面
    var mypath=__dirname+"/static/index.html";
    var data=fs.readFileSync(mypath,"utf-8");
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(data);
}