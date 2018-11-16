import * as express from "express";
import * as session from "express-session";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as path from "path";
import * as NewsAPI from "newsapi";

// Let the process crash on unhandled promises
process.on('unhandledRejection', err => { throw err; });

dotenv.config();

const app = express();
const newsapi = new NewsAPI(process.env.NEWS_API);

app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());
//get for pages
app.get("/", (req, res, next) => {
	express.static("dist/client/app")(req, res, next);
});

app.get("/statpage", (req, res, next) => {
	express.static("dist/client")(req, res, next);	
});
//gets for functions
app.post("/getBlogs", async (req,res) => {
	console.log(req.body);
	//use web news api
	let blogs = await newsapi.v2.everything({
		sources: "bleacher-report",
		q: req.body.keywords,
		page: req.body.page || 1,
		language: "en",
		sortBy: "relevancy"
	});
	if(blogs.status === "ok"){
		//console.log(blogs.articles);
		res.send(blogs.articles);
	}
	else{
		console.error("Problem with fetching blogs");
		res.send([]);
	}

});


app.use("/static", express.static("dist/client"));

let httpServer = app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT}`);
});