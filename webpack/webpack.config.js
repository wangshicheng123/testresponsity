// (直接写模块名称就可以，会自动到node_modules文件夹下面去寻找)
// 导入一个path模块
const path =require("path");

// 注意使用一个插件必须首先进行引入
const HtmlPlugin=require("html-webpack-plugin");

// css文件的分离
const ExtractTextPlugin=require("extract-text-webpack-plugin");

// 清除没使用css文件
const glob=require("glob");
const PurifyCSSPlugin=require("purifycss-webpack");

// 打包注释
const webpack=require("webpack");

// 资源拷贝
const CopyWebpackPlugin=require("copy-webpack-plugin");


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
            // html文件中含有图片的是解决方法
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

            // 把css3的语法的前缀加上，增强其兼容性
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },"postcss-loader"]
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
        new ExtractTextPlugin("index.css"),

        // 不使用的css文件不会被打包到css文件中
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname,'src/*.html'))
        }),

        // 打包注释
        new webpack.BannerPlugin("翻版必究"),

        // 资源拷贝
        new CopyWebpackPlugin([{
            from: __dirname+"/src/public",
            to: "./public"
        }])
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