import * as express from "express";
const webpage = express.Router();

webpage.get("/", (req, res) => {
    res.render("index");
});

webpage.get('/signup',(req,res)=>{
    res.render('users/signup');
});

webpage.get('/signin',(req,res)=>{
    res.render('users/signin');
});

webpage.get('/change-password',(req,res)=>{
    res.render('users/changePassword');
});

/* https://www.youtube.com/watch?v=SccSCuHhOw0 
Cette vidéo pourra être utile au moment de faire des routes dynamiques (17eme minute)
*/

export default webpage;