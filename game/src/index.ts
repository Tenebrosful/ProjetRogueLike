import { randomBytes } from "crypto";
import * as random_generator from "random-seed";
import GameCanvas from "./class/GameCanvas";
import Room from "./class/Room";

const seed = randomBytes(10).toString("hex");

const rand: random_generator.RandomSeed = random_generator.create(seed);

const room = Room.generateRandom(rand);

GameCanvas.renderRoom(room);