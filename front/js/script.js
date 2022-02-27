/* 
Pour la page index.html : Retrouver les données des produits, ensuite, pour l'affichage :
--> Tout ce qui sera ajouter à la page se trouvera dans la section à l'id/index items.
- Une balise 'a' doit contenir le lien vers la page produit (qui possédera une autre mise en page) et dont l'url doit être égale à l'id produit
- ouverture d'une balise article
- ajout de l'image en fonction du produit
- un h3 avec le nom du produit
- un p de description
- fermeture balise article + fermeture balise a. 
*/

fetch("http://localhost:3000/api/products")
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        console.log(data);
        let productElement;
        data.forEach(element => {
            productElement = document.createElement("a");
            document.getElementById("items").appendChild(productElement);

            productElement = document.createElement("article");
            let linkArray = document.querySelectorAll("section > a")

            for(let link of linkArray){
                link.setAttribute("href", "#");
                link.appendChild(productElement);
            }

            productElement = document.createElement("img")
            productElementSecond = document.createElement("h3")
            productElementThird = document.createElement("p")
            let articleArray = document.querySelectorAll("article");

            for(let article of articleArray){
                article.appendChild(productElement)
                productElement.setAttribute("src", "")
                article.appendChild(productElementSecond)
                productElementSecond.classList.add("productName")
                article.appendChild(productElementThird)
                productElementThird.classList.add("productDescription")
            }

        });
    })
    .catch(function(err){
        console.log("Erreur lors du chargement : Le serveur ne répond pas");
    })

// for(let produit of products){
//     let html;
// }

