/* Gestion Erreurs Form Start*/

let form = document.querySelector('form');

// On selectionne les différents input du form

// let email = form1.email;
// let userName = form1.username;
// let password = form1.password;

let formElement     = document.form1;
let emailInput      = form.email;
let firstNameInput  = form.firstName;
let lastNameInput   = form.lastName;
let passwordInput   = form.password;
let submit          = form.signin;



function validateEmail() {
    var emailValue = document.form1.email.value; // on récupère la valeur entrée dans l'input email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Chaine de caractère de la forme suivante : "example@.fr"
    if (emailValue.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    

    
})






// Création de la fonction alertBox





// vérifier la longueur du mdp
function validatePasswordLength() {
    var passwordValueLength = document.form1.password.value.length;

    if (passwordValueLength < 8) {
        return false
    } else {
        return true
    }
}




/* Gestion Erreurs Form End*/




/* API : Sign in  start */

function createUser(emailValue, passwordValue, firstName, lastName) {

    let fetch_config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": emailValue,
            "password": passwordValue,
        })
    }

    fetch("https://simplonews.brianboudrioux.fr/users", fetch_config)
        .then(function (response) {
            response.json()
                .then(function (data) {

                    if (response.status == 403) {
                        console.log("erreur authentification");
                        console.log(data); // rediriger vers la page login
                    } else if (response.status == 400) {
                        console.log('erreur données requêtes');
                        console.log(data);
                    } else {
                        console.log('success');
                        console.log(data);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })

        })
        .catch(function (errors) {
            console.log(errors); // Erreur 500
        })

}





formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let emailValue = emailInput.value;
    let passwordValue = passwordInput.value;
    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;


    createUser(emailValue, passwordValue, firstNameValue, lastNameValue);

    if (!validateEmail()) {
        alertBox('Veuillez entrer une adresse mail valide');
    } else if (!validatePasswordLength()) {
        alertBox('Votre mot de passe doit contenir au moins 8 caractères')
    } else if (validateForm() && validateEmail()) {
        emailInput.value     = "";
        passwordInput.value  = "";
        firstNameInput.value = "";
        lastNameInput.value  = "";
        document.querySelector('.errors-container').textContent = '';
    }
})


/* API : Sign in  end */


/* Login redirection start*/


changePage('static/views/login.html')

/* Login redirection end*/
