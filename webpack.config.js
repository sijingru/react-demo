const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
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
				test: '/\.css$/',
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
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
		new webpack.HotModuleReplacementPlugin()
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