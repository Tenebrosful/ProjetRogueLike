import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Game } from "../../database/models/Game";
import { User } from "../../database/models/User";
import { randomBytes } from "crypto";

dotenv.config({ path: "config/serv-web.env" });
const game = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(10).toString("hex");

game.post("/end", async (req, res) => {   
    const { killedMonster, coveredStage, collectedItems, token } = req.body;
    let pseudoJoueur = "Guess";
    if(token !== null){
        const user = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
        if(user.username) pseudoJoueur = user.username;
    }
    // Vérification des champs 
    const gameDate = addDate();
    await Game.create({
        collectedItems,
        coveredStage,
        gameDate,
        killedMonster,
        pseudoJoueur
    }).then((docGame: { _id: any; }) => {
        if(token !== null){
            const user = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
            User.findById(user.id).then(doc => {
                doc["parties"].push(docGame._id);
                doc.save();
            });
        }
    });
    res.status(200).json({ status: "ok" }); 
});

game.get("/menu",(req,res)=>{
    res.render("game/menu");
});

game.get("/play",(req,res)=>{
    res.render("game/play");
});

game.get("/history",(req,res)=>{
    console.log("ha");
    res.render("game/history");
});

function addDate(){
    const date = new Date();
    console.log(date);
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
    const ma_date = hour + "/" + minutes + "/" + seconds + "/" + day + "/" + month + "/" + year;
    return ma_date;
}

export default game;