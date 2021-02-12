let key = sessionStorage.getItem('token');




function getArticle(key) {
    let config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + key
        }
    }

    fetch('https://simplonews.brianboudrioux.fr/articles', config)
        .then(function (response) {

            if (response.status == 403) {
                response.json()
                    .then(function (error) {
                        sessionStorage.removeItem('token')
                    })
            } else if (response.status == 400) {
                response.json()
                    .then(function (error) {
                        alertBox(error.error)
                    })
            } else {
                response.json()
                    .then(function (articles) {
                        let news = articles.articles;
                        let actu = new ArticlesObjet(news);
                        actu.createHTMLStruct();

                        redirectionCategories(actu)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }

        })
        .catch(function (error) {
            console.log(error);
        })
}

class ArticlesObjet {
    constructor(product) {
        this.product = product;
    }
    createHTMLStruct() {
        let cible = document.querySelectorAll('div.art');
        let str = "";

        for (let i = 0; i < cible.length; i++) {
            str = `<div data-key ="${this.product[i].id}" class="box-content redir">
            <h3>${this.product[i].title}</h3>
            </div>`
            cible[i].innerHTML = str;

        }
        redirection();
    }


    createHTMLStructCategory(linkName) {
        let cible = document.querySelectorAll('div.art');
        let str = "";
        let count = 0;

        for (let i = 0; i < cible.length; i++) {
            cible[i].innerHTML = str;
        }

        for (let i = 0; count < cible.length; i++) {
            console.log(this.product[i].Category.name + '§§');
            if (this.product[i].Category.name == linkName) {
                console.log('ok');
                str = `<div data-key ="${this.product[i].id}" class="box-content redir">
                <h3>${this.product[i].title}</h3>
                </div>`
                cible[count].innerHTML = str;
                count++;
            }
        }
        console.log('__________');
    }
}

function redirection() {

    let cible = document.querySelectorAll('div.redir');

    cible.forEach((e) => {
        e.addEventListener("click", () => {

            let code = e.getAttribute('data-key');
            document.location = 'article.html'
            sessionStorage.setItem('id', code);
        });
    })
}


getArticle(key);









function redirectionCategories(actu) {

    let cible = document.querySelectorAll('nav.main-nav ul li');


    cible.forEach((e) => {
        e.addEventListener("click", () => {

            let content = e.textContent;
            actu.createHTMLStructCategory(content);
        });
    })
}