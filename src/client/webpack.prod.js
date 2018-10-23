const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const fs = require("fs");

const publicPath = "static";

module.exports = merge(common, {
	devtool: "none",
	output: {
		publicPath: publicPath
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "app", "index.html"),
			inject: "body",
			filename: "index.html",
			chunks: ["app"],
			publicPath: publicPath
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "admin", "index.html"),
			inject: "body",
			filename: "admin/index.html",
			chunks: ["admin"],
			publicPath: publicPath
		})
	]
});
