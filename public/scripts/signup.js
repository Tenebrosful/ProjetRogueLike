/**
 * @author : Clément Boulet
 */
//https://www.youtube.com/watch?v=b91XgdyX-SM 7'40
const signUpform = document.getElementById("signup-form");

signUpform.addEventListener('submit', signUpUser)

async function signUpUser(event) {
    event.preventDefault()
    const username = document.getElementById("input_username").value;
    const password = document.getElementById("input_password").value;

    const result = await fetch('/api/account/signup', {
        body: JSON.stringify({
            password,
            username
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