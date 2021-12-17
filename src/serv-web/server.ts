import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { User } from "./models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const app = express();
const port = 9999;

const JWT_SECRET = "La réussite est une fleur qu'on arrose de volonté - Lucas Da Silva";

mongoose.connect('mongodb://localhost:27017/user-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

import webpage from "./routes/webpage";
app.use('/', webpage);

import account from "./routes/account";
app.use("/api/account", account);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});