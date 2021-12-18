/**
 * @author : Clément Boulet
 */
//https://www.youtube.com/watch?v=b91XgdyX-SM 7'40
const changePasswordform = document.getElementById("change-password-form");

const passwordInput = document.getElementById("input_new-password");
const confirmPasswordInput = document.getElementById("input_confirm_new-password");

changePasswordform.addEventListener('submit', changePassordUser)

async function changePassordUser(event) {
    event.preventDefault()
    const password = passwordInput.value;

    const result = await fetch('/api/account/change-password', {
        body: JSON.stringify({
            newpassword: password,
            token: localStorage.getItem('token')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then((res) => res.json());

    if (result.status === 'ok') {
        alert('Success')
    } else {
        alert(result.error)
    }
    console.log(result)
}

/**
 * Based on https://codepen.io/diegoleme/pen/surIK
 */

 function validatePassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Les mots de passe ne correspondent pas");
    } else {
        confirmPasswordInput.setCustomValidity('');
    }
}

passwordInput.onchange = validatePassword;
confirmPasswordInput.onkeyup = validatePassword;