import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../../database/models/User";
import { randomBytes } from "crypto";
import { MongoError } from "mongodb";
import { Game } from "../../database/models/Game";

dotenv.config({ path: "config/serv-web.env" });
const account = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(10).toString("hex");

account.post("/signin", async (req, res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();

    if (!user) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

    if (!await bcrypt.compare(password, user.password)) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        JWT_SECRET
    );

    res.status(200).json({ data: token, status: "ok" });

});

account.post("/signup", async (req, res) => {

    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== "string") { res.status(400).json({ error: "Invalid username", status: "error" }); return; }

    if (!plainTextPassword || typeof plainTextPassword !== "string") { res.status(400).json({ error: "Invalid password", status: "error" }); return; }

    // On peut aussi faire des restrictions demandant une majuscule
    if (plainTextPassword.length <= 5) { res.status(400).json({ error: "Password too small. Should be atleast 6 characters", status: "error" }); return; }

    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            password,
            username
        });
        console.log("User created: ", response);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        if (error instanceof Error &&  (error as MongoError).code === 11000)
            res.status(400).json({ error: "Username already in use", status: "error" });
        else
            throw error;
    }    
});

account.post("/change-password", async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== "string") { res.status(400).json({ error: "Invalid password", status: "error" }); return; }

    if (plainTextPassword.length <= 5) { res.json({ error: "Password too small. Should be atleast 6 characters", status: "error" }); return; }

    try {
        const user = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
        const _id = user.id;
        const password = await bcrypt.hash(plainTextPassword, 10);
        await User.updateOne({ _id }, {
            $set: { password }
        });
        res.status(200).json({ status: "ok" });
    }catch (error) {
        res.status(400).json({ error: " :) ", status: "error" });
    }
});

account.post("/history", async(req,res) => {
    const { token } = req.body;
    const user = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
    const user_id = user.id;

    User.findOne({_id: user_id}).then(async (docUser)=>{

        const fn = async function getGame(game_id: any){
            return Game.findOne({_id:game_id});
        };

        const actions = await docUser.parties.map(fn);
        const results = await Promise.all(actions);

        //@ts-ignore tmp
        const historique = new Array;
        results.forEach(result => {
            const partie = 
            [
                {gameDate: result.gameDate},
                {killedMonsters: result.killedMonster},
                {coveredStages: result.coveredStage},
                {collectedItems: result.collectedItems}
            ];
            historique.push(partie);
        });
        const StringHistory = JSON.stringify(historique);
        res.status(200).json({  data : StringHistory,status: "ok"});
    });
    
});

export default account;
