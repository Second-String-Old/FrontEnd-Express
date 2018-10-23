const HtmlWebpackPlugin = require("html-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const publicPath = "/static/";

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	output: {
		publicPath: publicPath
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "app", "index.html"),
			inject: "body",
			filename: "app/index.html",
			chunks: ["app"],
			publicPath: publicPath
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "statpage", "index.html"),
			inject: "body",
			filename: "statpage/index.html",
			chunks: ["statpage"],
			publicPath: publicPath
		})
	]
});