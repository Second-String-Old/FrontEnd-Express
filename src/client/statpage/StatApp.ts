import "./styles.css";
import "../common/styles.css";
import {StatController} from "./StatController";
 
/**
 * App is responsible for handling the home page
 */
class StatApp
{
	/**
	 * Creates an instance of the app, constructing recognizer, event handler, and some dom elements
	 */
	private player: any;
	private statTable: HTMLDivElement;
	private statController: StatController;
	/**
	 * Creates an instance of the app, constructing recognizer, event handler, and some dom elements
	 */
	constructor(){
		this.statTable= document.querySelector(".blog-content");
		this.statController = new StatController(this.statTable);
		this.statController.PopulateTable();
	}
}

new StatApp();
