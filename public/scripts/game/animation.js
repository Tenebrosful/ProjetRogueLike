import PainMechant from './class/PainMechant.js';

const decalage_top = 80;
const taille_image = 64;
const hauteur_heros = 70;
const largeur_heros = 50;
const marge_heros = 5;

// Création de la salle 
let roomAsArray = [
    '+++++N+++++++++++',
    '+***************+',
    '+***************+',
    '+************o**+',
    '+***************+',
    '+***************+',
    '+***************+',
    '+***************+',
    '+***************+',
    '+***************+',
    '+++++++++++++++++'
]
let hauteur = roomAsArray.length
let largeur = roomAsArray[0].length
// Verifions que chaque ligne ait la bonne taille
roomAsArray.forEach(ligne => {
    if (ligne.length != largeur){
        throw 'Erreur dans la génération de la salle' 
    }
});

generateRoom(roomAsArray, hauteur, largeur)

function generateRoom(roomAsArray){
    for(var indexHauteur=0; indexHauteur < hauteur; indexHauteur++){
        for (var indexLargeur = 0; indexLargeur < roomAsArray[indexHauteur].length; indexLargeur++){
            charToImg((roomAsArray[indexHauteur][indexLargeur]), indexHauteur, indexLargeur)
        }
    }
}
function charToImg(char, indexHauteur, indexLargeur){
    let salle2D = document.getElementById('salle_2d');
    let tuile = document.createElement('div')
    tuile.style.display = "inline-block";
        tuile.style.height = "64px";
        tuile.style.width = "64px";
        tuile.style.position = "absolute";
        tuile.style.top = (indexHauteur * taille_image)+"px";
        tuile.style.left = (indexLargeur * taille_image) + "px"
        tuile.style.backgroundImage = "url(/static/img/tiles/default.png)"
    switch (char){
        case '+':
            tuile.style.backgroundImage = "url(/static/img/tiles/lava.jpg)" 
            break
        case 'N':
            tuile.style.backgroundImage = "url(/static/img/tiles/lavabridgeV.jpg)" 
            break
        case '*':
            tuile.style.backgroundImage = "url(/static/img/tiles/sol.png)" 
            break
        case 'o':
            tuile.style.backgroundImage = "url(/static/img/tiles/lava.jpg)" 
            break
    }
    salle2D.appendChild(tuile)
}

//Initialisation du canvas
var width = largeur*64,
    height = hauteur*64,
    ratio = window.devicePixelRatio;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
ctx.scale(ratio, ratio);

canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + "px";
canvas.style.height = height + "px";

console.log(canvas.offsetTop);
console.log(canvas.offsetWidth);


/*
//Background
var image = new Image();
image.src = "/static/img/tiles/default.png";

image.onload = function(){
var background = ctx.createPattern(image,'repeat'); 
ctx.fillStyle = background;
}
*/

//Variable de touches
var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

window.onkeydown = function (e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) Keys.left = true;
    else if (kc === 38) Keys.up = true;
    else if (kc === 39) Keys.right = true;
    else if (kc === 40) Keys.down = true;
};

window.onkeyup = function (e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) Keys.left = false;
    else if (kc === 38) Keys.up = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 40) Keys.down = false;
};
var object = new Image();
object.src = "/static/img/heros/K_Roi_ssant_gauche.png";

//Position du héros
var posX = ((largeur-1)*taille_image)/2;
var posY = ((hauteur-1)*taille_image)/2;



//Déplacement et vérification des bord du canvas
function moveCheck() {
    if (Keys.up) {
        if (canvas.offsetTop - hauteur_heros - marge_heros + taille_image <= posY) {
            posY -= 5;
        } else {
            console.log("Contre le mur du haut")
            console.log(posY)
            console.log(posX)
        }
    }
    else if (Keys.down) {
        if (canvas.height - hauteur_heros - marge_heros - taille_image >= posY) {
            posY += 5;
        } else {
            console.log("Contre le mur du bas")
        }
    }

    if (Keys.left) {
        object.src = "/static/img/heros/K_Roi_ssant_gauche.png";
        if (canvas.offsetLeft + marge_heros + taille_image <= posX) {
            posX -= 5;
        }else{
            console.log("Contre le mur de gauche")
        }

    }
    else if (Keys.right) {
        object.src = "/static/img/heros/K_Roi_ssant_droite.png";
        if (canvas.width - largeur_heros - marge_heros - taille_image >= posX) {
            posX += 5;
        }else{
            console.log("Contre le mur de droite")
        }
    }
}

function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderObject() {
    ctx.drawImage(object, posX, posY);
}

//Fonction pour dessiner et deplacement un ennemi sur le canvas 
function displayVilain(vilain){
    vilain.move();
    ctx.drawImage(vilain.sprite , vilain.posX, vilain.posY); 
}

var pain = new PainMechant();
function run() {
    renderCanvas();
    renderObject();
    moveCheck();
    displayVilain(pain)
}

setInterval(run, 10);
