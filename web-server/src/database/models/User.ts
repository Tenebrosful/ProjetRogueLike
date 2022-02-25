import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    parties : [
        {
        ref: "GameSchema",
        type: mongoose.Schema.Types.ObjectId        
        }],
    password: { required: true, type: String },
    username: { required: true, type: String, unique: true }
}, { collection: "users" });

export const User = mongoose.model("UserSchema", UserSchema);