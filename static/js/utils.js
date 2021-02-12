function changePage(page) {
    let link = document.querySelector('div.form-links > a:not(.active)');

    link.addEventListener('click', () => {
        document.location.href = page
    })
}




function validateForm(input_arr) {

    for (let i = 0; i < input_arr.length; i++) {
        const element = input_arr[i];

        if (element.value == null || element.value == "")
            return false;
    }

    return true;
}



function alertBox(string) {
    let container = document.querySelector('main .errors-container');
    let error = document.createElement('div');
    error.classList.add('errors');
    error.innerHTML = `<p>${string}<p>
    <i class="fas fa-times"></i>`;
    container.appendChild(error)


    let cross = document.querySelectorAll('.errors-container .fa-times');

    cross.forEach((e) => {
        e.addEventListener('click', () => {
            e.parentElement.parentElement.remove()
        })
    })
}


