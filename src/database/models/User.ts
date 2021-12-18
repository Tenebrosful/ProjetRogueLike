import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    password: { required: true, type: String },
    username: { required: true, type: String, unique: true }
}, { collection: 'users' });

export const User = mongoose.model('UserSchema', UserSchema);