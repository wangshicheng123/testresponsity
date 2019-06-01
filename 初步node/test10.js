var fs= require("fs");


// 如果不加上utf-8的话读取的文件将会是一段十六进制编码
// fs node 的自带的模块，使用文件读取的，
// 如果拿到一个文件不读取将无法进行使用，
// 所以必须进行读取 
fs.readFile("./1.txt","utf-8",function(error,data){
    // console.log(data);
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
});