// 引入node.js的原生的http模块
let http = require("http");

// 通过http模块搭建一个我们端口号为8080的服务器
http.createServer(function(req,res){
    console.log(req.url);
    // 注意Content-type的属性值为text/html
    // (从服务端向浏览器端表明我们返回的数据在浏览器段以什么格式进行解析)
    res.writeHead(200,{"Content-type":"text/html"})
    // end方法表明一个请求的结束，同时也把数据返回给了浏览器端；
    res.end("<h1>this is a title</h1>");
}).listen(8080,function(){
    console.log("sever start");
});