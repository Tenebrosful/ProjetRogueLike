import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../../database/models/User";
import { randomBytes } from "crypto";

dotenv.config({ path: "config/express.env" });
const account = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(10).toString("hex");

account.post('/signin', async (req, res) => {

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
});

account.post('/signup', async (req, res) => {

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
});

account.post('/change-password', async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length <= 5) {
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
});

export default account;