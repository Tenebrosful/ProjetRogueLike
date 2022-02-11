import * as express from "express";
const webpage = express.Router();

webpage.get("/", (req, res) => {
    res.render("index");
});

webpage.get("/signup",(req,res)=>{
    res.render("users/signup");
});

webpage.get("/parameters",(req,res)=>{
    res.render("users/parameters");
});

webpage.get("/signin",(req,res)=>{
    res.render("users/signin");
});

webpage.get("/change-password",(req,res)=>{
    res.render("users/changePassword");
});

webpage.get("/profil",(req,res)=>{
    res.render("users/profil");
});

webpage.get("/menu",(req,res)=>{
    res.render("game/menu");
});

webpage.get("/play",(req,res)=>{
    res.render("game/play");
});

webpage.get("/history",(req,res)=>{
    res.render("game/history");
});


/* https://www.youtube.com/watch?v=SccSCuHhOw0 
Cette vidéo pourra être utile au moment de faire des routes dynamiques (17eme minute)
*/

export default webpage;