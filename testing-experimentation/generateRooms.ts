import { Room } from "../src/class/Room";
import * as random_generator from "random-seed";
import { randomBytes } from "crypto";

const seed = randomBytes(10).toString("hex");
// const seed = "oui";

const rand: random_generator.RandomSeed = random_generator.create(seed);

console.log("Seed = ", seed);

const generateRooms: Room[] = [];

for (let i = 0; i < 20; i++)
  generateRooms.push(Room.generateRandom(rand));

generateRooms.forEach(room => console.log(room.renderTextTiles()));

rand.done();



//SCRIPT DE GENERATION DES ETAGES (PHP)

// <?php
// $etage = 1;
// $etagemax = 100;
// $nbpiecedefault = 10;
// $nbpiece = 0;
// $progressionetage = 0;
// $tailleMap = 15;

// function limitmin($int)
// {
// 	if ($int<4)
// 	{
// 		return 4;
// 	}
// 	else
// 	{
// 		return $int;
// 	}
// }

// $quadrillage=[];

// for ($i=0; $i < $tailleMap; $i++)
// { 
// 	for ($j=0; $j < $tailleMap; $j++)
// 	{	 
// 		$quadrillage[$i][$j]=[false,0,0,0,0,0,false];
// 	}
// }

// $salleInit=[true,1,100,100,100,100,false];
// $quadrillage[$tailleMap/2][$tailleMap/2]=$salleInit;

// for ($i=0; $i < $tailleMap; $i++ && $nbpiecedefault>0)
// { 
// 	for ($j=0; $j < $tailleMap; $j++ && $nbpiecedefault>0)
// 	{	 
// 		if ($quadrillage[$i][$j][0] == true && $quadrillage[$i][$j][6] == false && $nbpiecedefault>0)
// 		{
// 			if ($quadrillage[$i][$j][2] >= rand(1,100))
// 			{
// 				$quadrillage[$i-1][$j] = $salleInit;
// 				$quadrillage[$i-1][$j][2] -= 25;
// 				$quadrillage[$i-1][$j][3] -= 50;
// 				$quadrillage[$i-1][$j][4] -= 100;
// 				$quadrillage[$i-1][$j][5] -= 50;
// 				$nbpiecedefault -= 1;
// 			}

// 			if ($quadrillage[$i][$j][3] >= rand(1,100))
// 			{
// 				$quadrillage[$i][$j+1] = $salleInit;
// 				$quadrillage[$i][$j+1][2] -= 50;
// 				$quadrillage[$i][$j+1][3] -= 25;
// 				$quadrillage[$i][$j+1][4] -= 50;
// 				$quadrillage[$i][$j+1][5] -= 100;
// 				$nbpiecedefault -= 1;
// 			}

// 			if ($quadrillage[$i][$j][4] >= rand(1,100))
// 			{
// 				$quadrillage[$i+1][$j] = $salleInit;
// 				$quadrillage[$i+1][$j][2] -= 100;
// 				$quadrillage[$i+1][$j][3] -= 50;
// 				$quadrillage[$i+1][$j][4] -= 25;
// 				$quadrillage[$i+1][$j][5] -= 50;
// 				$nbpiecedefault -= 1;
// 			}

// 			if ($quadrillage[$i][$j][5] >= rand(1,100))
// 			{
// 				$quadrillage[$i][$j-1] = $salleInit;
// 				$quadrillage[$i][$j-1][2] -= 50;
// 				$quadrillage[$i][$j-1][3] -= 100;
// 				$quadrillage[$i][$j-1][4] -= 50;
// 				$quadrillage[$i][$j-1][5] -= 25;
// 				$nbpiecedefault -= 1;
// 			}

// 			$quadrillage[$i][$j][6] == true;
// 		}
// 	}
// }

// //Affichage de la map
// echo "<table style=\"background-color:black;\">";
// foreach ($quadrillage as $salles)
// {
// 	echo "<tr>";
// 	foreach ($salles as $salle)
// 	{
// 		if ($salle[0])
// 		{
// 			echo "<td style=\"color:lime;\">X</td>";
// 		}
// 		else
// 		{
// 			echo "<td style=\"color:red;\">X</td>";
// 		}
		
// 	}
// 	echo "</tr>";
// }
// echo "</table>";
