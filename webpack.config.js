const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const config = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/react.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main_[hash:8].js'
	},
	module: {
		rules: [
			{
				test: '/\.(css|less)$/',
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							//  默认情况下，它在webpackOptions.output中使用publicPath
							publicPath: '../',
							// 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
							include: [path.resolve(__dirname, './src')]
						},
					},
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
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
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
			ignoreOrder: false	// 启用以删除有关顺序冲突的警告
		})
	],
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
	devtool: 'eval'
}

module.exports = config