const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/api/register', async(req,res)=>{
    console.log(req.body)
    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Serveur up at 9999')
})