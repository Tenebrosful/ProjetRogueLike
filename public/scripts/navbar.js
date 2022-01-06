const token = localStorage.getItem("token")
console.log(token);

const dropdown = document.getElementById("menu-dropdown2");
if(token){
    const liProfil = document.createElement('li')
        const aProfil = document.createElement('a')
            aProfil.classList.add("dropdown-item")
            aProfil.href="/profil"
            aProfil.innerHTML="Profil"
        liProfil.appendChild(aProfil)

    const liParam = document.createElement('li')
        const aParam = document.createElement('a')
            aParam.classList.add("dropdown-item")
            aParam.href="/params"
            aParam.innerText="Paramètres"
        liParam.appendChild(aParam)

    const hr = document.createElement('hr')

    const liLogout = document.createElement('li')
        const aLogout = document.createElement('a')
            aLogout.classList.add("dropdown-item")
            aLogout.href="/"
            aLogout.innerText="Deconnexion"
            aLogout.addEventListener("click", function(){
                localStorage.clear()
                document.location.href = '/';
            })
        liLogout.appendChild(aLogout)

    dropdown.appendChild(liProfil)
    dropdown.appendChild(liParam)
    dropdown.appendChild(hr)
    dropdown.appendChild(liLogout)

    

}else{
    const liSignup = document.createElement('li')
        const aSignup = document.createElement('a')
            aSignup.classList.add("dropdown-item")
            aSignup.setAttribute("href", "/signup");
            aSignup.innerHTML="Inscription"
        liSignup.appendChild(aSignup)

    const hr = document.createElement('hr')

    const liSignin = document.createElement('li')
        const aSignin = document.createElement('a')
            aSignin.classList.add("dropdown-item")
            aSignin.setAttribute("href", "/signin");
            aSignin.innerText="Connexion"
        liSignin.appendChild(aSignin)

    dropdown.appendChild(liSignup)
    dropdown.appendChild(hr)
    dropdown.appendChild(liSignin)

}
