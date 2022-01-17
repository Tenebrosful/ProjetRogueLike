import * as random_generator from "random-seed";
import { randomBytes } from "crypto";
import { Stage } from "../src/class/Stage";

function run() {
  const seed = randomBytes(10).toString("hex");
  // const seed = "oui";

  const rand: random_generator.RandomSeed = random_generator.create(seed);

  console.log("Seed = ", seed);

  for (let i = 1; i <= 10; i++) {
    console.log(`==== Étage ${i} ====`);
    new Stage({ floor: i }, rand);
  }

  rand.done();
}

run();
// setInterval(run, 5000);