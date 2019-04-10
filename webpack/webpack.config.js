// (直接写模块名称就可以，会自动到node_modules文件夹下面去寻找)
// 导入一个path模块
const path =require("path");

// 注意使用一个插件必须首先进行引入
const HtmlPlugin=require("html-webpack-plugin");

//
const ExtractTextPlugin=require("extract-text-webpack-plugin");

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

    module:{
        rules:[
            {
                test: /\.css$/,
                // 先使用css-loader,在使用style-loader
                // use: ["style-loader","css-loader"]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            // 当css文件中含有图片的时候处理方法
            {
                // 用于匹配图片文件的后缀名称
                test: /\.(png|jpg|gif)$/,
                // 指定使用的loader和loader的配置参数
                use: [{
                    loader: "url-loader",
                    options: {
                        // 是把小于500b的文件打包成为Base64的格式，写入到css文件中
                        limit: 500,
                        outputPath: '/images/'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/i,
                loader: 'html-withimg-loader'
            },

            //css打包到js文件中
            // {
            //     test: /\.scss$/,
            //     use: ["style-loader","css-loader","sass-loader"]
            // },

            // css分离到方法
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader","sass-loader"],
                    fallback: "style-loader"
                })
            },
            
            // es6语法转成es6语法
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },

    //插件，用于生产模板和各项功能
    plugins:[
        // 使用插件（实例化一个打包html文件的HtmlPlugin对象）
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            // chunks: [] //选择哪一个入口的js文件
            // hash: true,
            template: "./src/index.html"
        }),

        // 如果有多个html页面，需要new 多个HtmlPlugin实例化对象

        // css分离需要在plugins中在new 一个ExtraTextPlugin对象
        // 其参数是要分离的css文件的路径
        new ExtractTextPlugin("index.css")
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