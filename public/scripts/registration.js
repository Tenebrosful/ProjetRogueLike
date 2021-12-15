/**
 * @author : Clément Boulet
 */
//https://www.youtube.com/watch?v=b91XgdyX-SM 7'40
const form = document.getElementById("reg-form");

form.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById("input_username").value;
    const password = document.getElementById("input_password").value;

    const result = await fetch('/api/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json() )
    console.log(result)
}