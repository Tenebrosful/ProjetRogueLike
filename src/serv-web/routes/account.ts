import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../../database/models/User";
import { randomBytes } from "crypto";
import { MongoError } from "mongodb";

dotenv.config({ path: "config/express.env" });
const account = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(10).toString("hex");

account.post('/signin', async (req, res) => {

    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if (!user) { res.status(400).json({ status: 'error', error: 'Invalid username or password' }); return; }

    if (!await bcrypt.compare(password, user.password)) { res.status(400).json({ status: 'error', error: 'Invalid username or password' }); return; }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        JWT_SECRET
    )

    res.status(200).json({ status: 'ok', data: token });

});

account.post('/signup', async (req, res) => {

    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') { res.status(400).json({ status: 'error', error: 'Invalid username' }); return; }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') { res.status(400).json({ status: 'error', error: 'Invalid password' }); return; }

    //On peut aussi faire des restrictions demandant une majuscule
    if (plainTextPassword.length <= 5) { res.status(400).json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' }); return; }

    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const response = await User.create({
            password,
            username
        })
        console.log('User created: ', response)
    } catch (error) {
        if (error instanceof Error && error.name === "MongoError" && (error as MongoError).code === 11000)
            res.status(400).json({ status: 'error', error: 'Username already in use' });
        else
            throw error;
    }

    res.status(200).json({ status: 'ok' });
});

account.post('/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') { res.status(400).json({ status: 'error', error: 'Invalid password' }); return; }

    if (plainTextPassword.length <= 5) { res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' }); return; }

    try {
        const user = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne({ _id }, {
            $set: { password }
        })
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(400).json({ status: 'error', error: ' :) ' });
    }
});

export default account;