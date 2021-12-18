import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "config/serv-web.env" });
dotenv.config({ path: "config/bdd.env" });

const app = express();
const port = process.env.EXPRESS_PORT || 9999;

mongoose.connect(process.env.BDD_URL || "");

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

import logger from "./middleware/logger";
app.use(logger);

app.use("/static", express.static("public"));

import webpage from "./routes/webpage";
app.use('/', webpage);

import account from "./routes/account";
app.use("/api/account", account);

/**
 * Handle Errors
 */

import error400 from "./errors/error400";
import error500 from "./errors/error500";
app.use(error400);
app.use(error500); // Must be on last position

app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
});