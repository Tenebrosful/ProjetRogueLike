import * as random_generator from "random-seed";
import { randomBytes } from "crypto";
import Logger from "../src/game/class/Logger"; // eslint-disable-line @typescript-eslint/no-unused-vars
import Room from "../src/game/class/Room";

const seed = randomBytes(10).toString("hex");
// const seed = "oui";

// Logger.enable();

const rand: random_generator.RandomSeed = random_generator.create(seed);

console.log("Seed = ", seed);

const generateRooms: Room[] = [];

for (let i = 0; i < 20; i++)
  generateRooms.push(Room.generateRandom(rand));

generateRooms.forEach(room => console.log(room.renderTextTiles()));

rand.done();




