/**
 * @author : Clément Boulet
 */

const signInform = document.getElementById("signin-form");

signInform.addEventListener('submit', signInUser)

async function signInUser(event){
    event.preventDefault()
    const username = document.getElementById("input_username").value;
    const password = document.getElementById("input_password").value;

    const result = await fetch('/api/signin',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json() )
    if(result.status === 'ok'){
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        alert('Success')
    }else{
        alert(result.error)
    }
    console.log(result)
}