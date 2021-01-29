const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 用于处理多路径文件，使用purifycss的时候要用到glob.sync方法。
const glob = require('glob-all')
const { NODE_ENV } = process.env;
// Css tree shanking 摇树
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')
const config = {
	mode: NODE_ENV,
	entry: path.resolve(__dirname, './src/react.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main_[hash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							//  默认情况下，它在webpackOptions.output中使用publicPath
							publicPath: '../',
							// 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
						},
					},
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
				include: [path.resolve(__dirname, './src')]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.js/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			title: '测试webpack',
			template: './index.html',
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true
			}
		}),
		new CleanWebpackPlugin(),
		// 热更新所需的插件
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
			ignoreOrder: false	// 启用以删除有关顺序冲突的警告
		}),
		// 压缩css文件
		new OptimizeCssAssetsWebpackPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
						// 去掉注释
						preset: ["default", { discardComments: { removeAll: true } }]
				}
		}),
		new PurgeCSSPlugin({
			paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
		})
	],
	optimization: {
		// 模块只导出被使用的成员
		usedExports: true,
		// 压缩输出的结果
		minimize: NODE_ENV === 'production' ,
		// 尽可能合并每一个模块到一个函数中
		concatenateModules: true,
		//
		splitChunks: {
			chunks: "all", // 默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
			minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
			minChunks: 1,  // 表示被引用次数，默认为1；
			maxAsyncRequests: 5,  //所有异步请求不得超过5个
			maxInitialRequests: 3,  //初始话并行请求不得超过3个
			automaticNameDelimiter:'~',//名称分隔符，默认是~
			name: false,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
			cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
				common: {
					name: 'common',  //抽取的chunk的名字
					chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
					},
					test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
					},
					priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
					minChunks: 2,  //最少被几个chunk引用
					reuseExistingChunk: true,//  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
					enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
				}
			},
			cacheGroups: {
				react: {
					test: /[\\/]react|react-dom[\\/]/,
					name: 'react'
				},
				lodash: {
					test: /[\\/]lodash[\\/]/,
					name: 'lodash'
				}
			}
		}
	},
	// devServer和entry是平级的
	devServer: {
			// 指向打包后的文件地址
			contentBase: './dist',
			// 是否自动打开一个新窗口
			open: true,
			// 端口号
			port: 8888,
			// 是否开启热更新
			hot: true,
			// 启用热模块替换，而不会在构建失败时将页面刷新作为后备。
			hotOnly: true
	},
	devtool: 'eval',
	resolve: {
		// 规定在哪里寻找第三方模块
		modules: [path.resolve(__dirname, './node_modules')],
		// 别名 我们可以通过别名的方式快速定位到引用包的/方法的路径，优化打包和运行本地服务
		alias: {
			react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
      '@': path.resolve(__dirname, './src')
		},
		// 自动补齐后缀名，这个列表会让webpack一级一级寻找，尽量少配置
    extensions: ['.js', '.jsx']
	}
}

module.exports = config