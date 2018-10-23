import * as express from "express";
import * as session from "express-session";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as path from "path";

// Let the process crash on unhandled promises
process.on('unhandledRejection', err => { throw err; });

dotenv.config();

const app = express();

app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());

app.get("/", (req, res, next) => {
	express.static("dist/client/app")(req, res, next);
});

app.get("/statpage", (req, res, next) => {
	express.static("dist/client")(req, res, next);	
});
app.use("/static", express.static("dist/client"));

let httpServer = app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT}`);
});