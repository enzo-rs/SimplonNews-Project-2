/* Signin redirection start */
changePage('../../index.html')

/* Signin redirection end */


/* API : login start */

let formElement = document.form1;
let emailInput = formElement.email;
let passwordInput = formElement.password;
let submit = formElement.signin;


function accessUser(email, password) {
    let fetch_config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    }

    fetch("https://simplonews.brianboudrioux.fr/users/login", fetch_config)
        .then(function (response) {

            if (response.status == 400) {
                alertBox(`Email ou mot de passe incorrect.`);
            } else
                response.json()
                .then(function (data) {
                    let token = data.token;

                    sessionStorage.setItem('token', token);
                    document.location.href = '../views/home.html'

                })

        })
}





formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let emailValue = emailInput.value;
    let passwordValue = passwordInput.value;

    let validate = validateForm([emailInput, passwordInput])

    if (validate) {
        accessUser(emailValue, passwordValue);
        emailInput.value = "";
        passwordInput.value = "";
        document.querySelector('.errors-container').textContent = '';
    } else {
        alertBox('Veuillez remplir tous les champs')
    }
})



/* API : login end */