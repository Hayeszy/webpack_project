const path = require("path")
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 插件-自动清除dist目录内容
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/main.js", // 入口
    output: {
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "bundle.js" // 出口文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //以我们自己的html文件作为模板去生成dist/html文件
            filename: 'index.html' // 生成文件的名称
        }), //插件-自动生成html文件
        // new CleanWebpackPlugin(), // 删除的是ouput path 里配置的那个输出文件的文件夹
    ],
    devServer: { //添加服务器配置
        port: 3000, // 端口号
        open: true
    },
    module: { // loader 加载器
        rules: [ // loader的规则
            {
                test: /\.css$/, // 匹配所有的css文件
                // loader 执行的顺序： use数组里从右向左运行
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/, // 匹配执行类型的文件
                // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
                // 执行的顺序 less-loader css-loader style-loader
                use: ["style-loader", "css-loader", 'less-loader']
            },
            // { // webpack 4
            //   test: /\.(png|jpg|gif)$/i, // 匹配的图片
            //   // use: ['url-loader'],
            //   // url-loader 转换based64 直接插入
            //   // 不好的地方？？？based64 太大 如何解决

            //   // 对图片的大小进行限制
            //   // 配置limit, 超过 8 * 1024, 不转, file-loader复制, 随机名, 输出文件

            //   // file-loader 直接复制图片 到dist目录下， 并且改改对应图片的src
            //   use: [{ // 对当前的loader 进行配置
            //     loader: 'url-loader',
            //     options: {
            //       limit: 8192,// 限制大小
            //     },
            //   }],
            // },
            {// webpack 5
                test: /\.(png|jpg|gif)$/i, // 匹配的图片
                // type: 'asset/resource', // 处理资源模块的方式
                // asset/resource 直接复制dist 目录下
                // type: 'asset/inline'
                // 直接转换成based64

                // 在导出一个 data URI 和发送一个单独的文件之间自动选择。
                // 如果你设置的是asset模式
                // 以8KB大小区分图片文件
                // 小于8KB的, 把图片文件转base64, 打包进js中
                // 大于8KB的, 直接把图片文件输出到dist下
                type: 'asset',
                dependency: { not: ['url'] },
                // parser: { // 解析器 规则
                //   dataUrlCondition: { // dataUrl的情况
                //     maxSize: 8 * 1024,
                //     // maxSize 限制最大值
                //   },
                // },
                // generator: { // 生成器
                //   filename: '[hash:6][ext]', // 资源文件处理之后 输出的文件名
                //   // ext 文件扩展名
                // }
            },
        ]
    }
}