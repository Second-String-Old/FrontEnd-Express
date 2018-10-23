const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		"app": path.join(__dirname, "app/App.ts"),
		"statpage": path.join(__dirname, "statpage/StatApp.ts")
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: {
							minimize: true
						}
					}]
				})
			},
			{
				test: /manifest(\\|\/).*$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "manifest/[name].[ext]"
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff|woff2)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "fonts/[name].[ext]"
						}
					}
				]
			},
			{
				test: /favicon/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "favicon/[name].[ext]"
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js' ]
	},
	output: {
		filename: "[name]/bundle.js",
		//publicPath: "/static/",
		path: path.resolve(__dirname, "../../dist/client")
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name]/styles.css"
		}),
		// Ignore all locale files of moment.js
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	]
};