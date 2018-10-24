import "./styles.css";
import "../common/styles.css";

import {BlogController} from "./BlogController";

/**
 * App is responsible for handling the home page
 */
class App
{
	private blogs: any;
	private blogSection: HTMLDivElement;
	private blogController: BlogController;
	/**
	 * Creates an instance of the app, constructing recognizer, event handler, and some dom elements
	 */
	constructor(){
		this.blogSection = document.querySelector(".blog-content");
		this.blogController = new BlogController(this.blogSection);
		this.blogController.PopulateBlogs();
	}
}

new App();
