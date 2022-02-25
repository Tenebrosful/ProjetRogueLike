import * as mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    collectedItems : { required: true, type: String },
    coveredStage : { required: true, type: String },
    gameDate : { required: true, type: String},
    killedMonster : { required: true, type: String },
    pseudoJoueur : { required : true, type: String }
}, { collection: "games" });

export const Game = mongoose.model("GameSchema", GameSchema);