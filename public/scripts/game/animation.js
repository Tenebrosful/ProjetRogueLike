//Initialisation du canvas
const decalage_top = 80;
const taille_image = 64;
var width = window.innerWidth,
    height = window.innerHeight - decalage_top,
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

let roomAsArray = [
    '+++++N+++++',
    '+*********+',
    '+*********+',
    '+*********+',
    '+++++++++++'
]
generateRoom(roomAsArray)
function generateRoom(roomAsArray){
    //Verifications
    let hauteur = roomAsArray.length;
    console.log(hauteur)
    let largeur = roomAsArray[0].length;
    console.log(largeur);
    roomAsArray.forEach(ligne => {
        if (ligne.length != largeur){
            throw 'Erreur dans la génération de la salle' 
        }
    });
    
    for(var indexHauteur=0; indexHauteur < hauteur; indexHauteur++){
        console.log(indexHauteur)
        for (var indexLargeur = 0; indexLargeur < roomAsArray[indexHauteur].length; indexLargeur++){
            charToImg((roomAsArray[indexHauteur][indexLargeur]), indexHauteur, indexLargeur)
            console.log(roomAsArray[indexHauteur][indexLargeur])
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
            tuile.style.backgroundImage = "url(/static/img/tiles/rouge.png)" 
            break
        case 'N':
            tuile.style.backgroundImage = "url(/static/img/tiles/porte.png)" 
            break
    }
    salle2D.appendChild(tuile)
}
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

//Position du sprite
var posX = 0;
var posY = 0;



//Déplacement et vérification des bord du canvas
function moveCheck() {
    if (Keys.up) {
        if (canvas.offsetTop -75 <= posY) {
            posY -= 5;
        } else {
            console.log("contre mur top ? ")
        }
    }
    else if (Keys.down) {
        if (canvas.height - 75 >= posY) {
            posY += 5;
        } else {
            console.log("Contre mur bot")
        }
    }

    if (Keys.left) {
        object.src = "/static/img/heros/K_Roi_ssant_gauche.png";
        if (canvas.offsetLeft + 5 <= posX) {
            posX -= 5;
        }

    }
    else if (Keys.right) {
        object.src = "/static/img/heros/K_Roi_ssant_droite.png";
        if (canvas.width - 65 >= posX) {
            posX += 5;
        }
    }
}

function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderObject() {
    ctx.drawImage(object, posX, posY);
}

function run() {
    renderCanvas();
    renderObject();
    moveCheck();
}

setInterval(run, 10);
