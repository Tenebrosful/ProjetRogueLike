const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./src/model/user.js')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/user-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/api/login', async(req,res)=>{
    res.json({status: 'ok' })
})

app.post('/api/register', async(req,res)=>{

    const { username, password : plainTextPassword } = req.body;

    if(!username || typeof username !== 'string'){
        return res.json({status: 'error', error: 'Invalid username'})
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }

    //On peut aussi faire des restrictions demandant une majuscule
    if(plainTextPassword.length < 5){
        return res.json({status: 'error', error: 'Password too small. Should be atleast 6 characters'})
    }

    const password = await bcrypt.hash(plainTextPassword,10)
    try{
        const response = await User.create({
            username,
            password
        })
        console.log('User created: ',response)
    }catch(error){
        if(error.code === 11000){
            //duplicate key
            return res.json({status: 'error', error:'Username already in use'})
        }
        throw error
    }
    console.log(password)
    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Serveur up at 9999')
})