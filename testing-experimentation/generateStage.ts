import * as random_generator from "random-seed";
import { randomBytes } from "crypto";
import { Stage } from "../src/game/class/Stage";
import { Logger } from "../src/game/class/Logger"; // eslint-disable-line @typescript-eslint/no-unused-vars

function run() {
  const seed = randomBytes(10).toString("hex");
  // const seed = "oui";

  // Logger.enable();

  const rand: random_generator.RandomSeed = random_generator.create(seed);

  console.log("Seed = ", seed);

  const stages: Stage[] = [];

  for (let i = 1; i <= 10; i++)
    stages.push(new Stage({ floor: i }, rand));

  rand.done();

  stages.forEach(stage => console.log(stage.renderTextStage()));
}

run();
// setInterval(run, 5000);