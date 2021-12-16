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

app.post('/api/register', async(req,res)=>{
    console.log(req.body)
    const { username, password : plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword,10)
    try{
        const response = await User.create({
            username,
            password
        })
        console.log('User created: ',response)
    }catch(error){
        console.log(error)
        return res.json({status: 'error'})
    }
    console.log(password)
    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Serveur up at 9999')
})