const express = require('express')
const router = express.Router()

router.get('/signup',(req,res)=>{
    res.render('users/signup')
})

router.get('/signin',(req,res)=>{
    res.render('users/signin')
})

router.get('/change-password',(req,res)=>{
    res.render('users/changePassword')
})

module.exports = router

/*https://www.youtube.com/watch?v=SccSCuHhOw0 
Cette vidéo pourra être utile au moment de faire des routes dynamiques (17eme minute)
*/