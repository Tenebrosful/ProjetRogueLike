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

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/api/signin', async (req, res) => {

    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username or password' })
    }

    if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username or password' })
})

app.post('/api/signup', async (req, res) => {

    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    //On peut aussi faire des restrictions demandant une majuscule
    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created: ', response)
    } catch (error) {
        if (error.code === 11000) {
            //duplicate key
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }
    console.log(password)
    res.json({ status: 'ok' })
})

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }


    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne({ _id }, {
            $set: { password }
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: ' :) ' })
    }
})

const userRouter = require('./routes/users')
app.use('/', userRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});