import "./styles.css";
import "../common/styles.css";
import "../images/time.svg"
import "../images/search.svg"

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
		this.AddEventListeners();
	}

	private AddEventListeners(){
		let searchBar = document.querySelector(".search-input") as HTMLInputElement;
		let searchButton = document.querySelector("#search-button") as HTMLButtonElement;
		searchButton.onclick = () => {
			//add search functionality?
		}
	}
}

new App();
