const token = localStorage.getItem("token")
console.log(token);

const dropdown = document.getElementById("menu-dropdown");
if(token){
    dropdown.innerHTML = `   
        <li><a class="dropdown-item" href="#">Profil</a></li>
        <li><a class="dropdown-item" href="#">Paramètres</a></li>
        <hr> 
        <li><a class="dropdown-item" href="#">Deconnexion</a></li> `
}else{
    dropdown.innerHTML = `
        <li><a class="dropdown-item" href="/signup">Inscription</a></li>
        <hr>
        <li><a class="dropdown-item" href="/signin">Connexion</a></li>
       `
}
function oooo(){
    oui = getElementById("menu-dropdown");
    const lol = document.createElement('li')
    lol.classList.add("dropdown-item")
    lol.innerHTML="deconnexion"
    lol.href = "/"
    lol.addEventListener("click", function(){
        localStorage.clear();
    });
    oui.appendChild(lol)}