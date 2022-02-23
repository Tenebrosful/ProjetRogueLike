import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    password: { required: true, type: String },
    username: { required: true, type: String, unique: true },
    parties : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameSchema"
        }]
}, { collection: "users" });

export const User = mongoose.model("UserSchema", UserSchema);