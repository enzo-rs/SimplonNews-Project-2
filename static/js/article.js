let key = sessionStorage.getItem('token');
let code = sessionStorage.getItem('id');


function getArticle(key) {
    let config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + key
        }
    }

    fetch('https://simplonews.brianboudrioux.fr/articles/' + code, config)
        .then(function (response) {

            if (response.status == 403) {
                response.json()
                    .then(function (error) {
                        sessionStorage.removeItem('token');
                        document.location.href = 'login.html'
                    })
            } else if (response.status == 400) {
                response.json()
                    .then(function (error) {
                        document.location.href = 'home.html'
                    })
            } else {
                response.json()
                    .then(function (articles) {
                        let news = articles.article;
                        let actu = new ArticlesObjet(news);
                        actu.createHTMLStruct();
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
        let cible = document.querySelector('article.content');
        let str = "";

        str = `
        <div class="img-container">
        <img class="img-article" src="${this.product.img}" alt="">
        </div>
            <div>
            
            <h2>${this.product.title}</h2>
            <h4>${this.product.resume}</h4>
            <p>${this.product.content}</p>
            </div>`



        cible.innerHTML = str;
    }
}



getArticle(key, code)