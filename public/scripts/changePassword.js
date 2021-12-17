/**
 * @author : Clément Boulet
 */
//https://www.youtube.com/watch?v=b91XgdyX-SM 7'40
const changePasswordform = document.getElementById("change-password-form");

changePasswordform.addEventListener('submit', changePassordUser)

async function changePassordUser(event){
    event.preventDefault()
    const password = document.getElementById("input_new-password").value;

    const result = await fetch('/api/change-password',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newpassword: password,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json() )
    if(result.status === 'ok'){
        alert('Success')
    }else{
        alert(result.error)
    }
    console.log(result)
}