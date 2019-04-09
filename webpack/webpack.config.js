// 导入一个path模块
const path =require("path");

// 注意使用一个插件必须首先进行引入
const HtmlPlugin=require("html-webpack-plugin");

module.exports={
    // 设置打包文件的模式（开发模式）
    mode: "development",
    entry: {
        // 配置打包的入口文件路径
        index: "./src/index.js",
        index2: "./src/index2.js"
    },
    output: {
        // 配置打包后的文件路径（path路径必须是绝对路径）
        path: path.resolve(__dirname,"dist"),

        // 可以配置多个入口文件，出口文件名与入口文件名相同
        filename: "[name].js"
        // filename: "index.js"
    },

    //插件，用于生产模板和各项功能
    plugins:[
        // 使用插件（实例化一个打包html文件的HtmlPlugin对象）
        new HtmlPlugin({
            // minify: {
                // removeAttributeQuotes: true
            // },
            // hash: true,
            template: "./src/index.html"
        })
    ],

    // 配置webpack开发服务功能
    devServer: {
        // 设置基本的目录结构
        contentBase: path.resolve(__dirname,"dist"),
        // 服务器的ip地址
        host: "localhost",
        // 配置服务端口号
        port: "8081",
        // 可以自动打开服务
        open: true

    }

}