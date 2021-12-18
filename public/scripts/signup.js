/**
 * @author : Clément Boulet
 */
// https://www.youtube.com/watch?v=b91XgdyX-SM 7'40
const signUpform = document.getElementById("signup-form");

const usernameInput = document.getElementById("input_username");
const passwordInput = document.getElementById("input_password");
const confirmPasswordInput = document.getElementById("input_confirm_password");

signUpform.addEventListener("submit", signUpUser);

async function signUpUser(event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const result = await fetch("/api/account/signup", {
        body: JSON.stringify({
            password,
            username
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then((res) => res.json());

    if (result.status === "ok") 
        alert("Success");
     else 
        alert(result.error);
    
    console.log(result);
}

/**
 * Based on https://codepen.io/diegoleme/pen/surIK
 */

function validatePassword() {
    if (passwordInput.value !== confirmPasswordInput.value) 
        confirmPasswordInput.setCustomValidity("Les mots de passe ne correspondent pas");
     else 
        confirmPasswordInput.setCustomValidity("");
    
}

passwordInput.onchange = validatePassword;
confirmPasswordInput.onkeyup = validatePassword;