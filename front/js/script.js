
fetch("http://localhost:3000/api/products")
    .then(function(data){
        return data.json();
    })
    .then(function(data){

        data.forEach(element => {
            createIndexPagination();
        });
        
        getContent(data);

        const linkArray = Array.from(document.querySelectorAll("section > a"));
        // Va attribuer un lien allant chercher l'id du produit et l'ajouter à l'url product.html?id=. 
        for(i = 0; i < linkArray.length; i++){
            linkArray[i].setAttribute("href", `product.html?id=${data[i]._id}`);
        }
    })
    .catch(function(err){
        console.log("Erreur lors du chargement : Le serveur ne répond pas");
    })


/* --------------------------------- 
Create the pagination of each products that is displayed on the index.html. 
I try not to use InnerHTML, deciding to go with createElement.
The structure of html for the products looks like : 
<a href="..."><article><img src="url" alt="altText"><h3 class="productName">Name</h3><p class="productDescription">description</p></article></a>
wich means : the balise a has a child : article
            -> Article has three child : img, h3 and p. 
            -> We need to add the attributes of some elements. for exemple : a need to have as an attribute : href
            -> Same goes for the class of the h3 and the p

/!\ That function only create the pagination of the pages. The links does not have an url, the images are not implemented, etc... 
-----------------------------------*/

const createIndexPagination = () => {
    let productElement;

    productElement = document.createElement("a");
    document.getElementById("items").appendChild(productElement);

    productElement = document.createElement("article");
    const linkArray = document.querySelectorAll("section > a");

    for(let link of linkArray){
        link.appendChild(productElement);
    }

    productElement = document.createElement("img");
    productElementSecond = document.createElement("h3");
    productElementThird = document.createElement("p");
    const articleArray = document.querySelectorAll("article");

    for(let article of articleArray){
        article.appendChild(productElement);
        article.appendChild(productElementSecond);
        productElementSecond.classList.add("productName");
        article.appendChild(productElementThird);
        productElementThird.classList.add("productDescription");
    }
};

/* --------------------------------- 
Get ALL the balise : img / h3 / p ; that have for parent element a balise article in the document. 
The Array.from() change the nodelist due to the querySelectorAll into an array. 
The boucle for will then add for each element (img / h3 / p) what they are lacking : attribute for images and text content for the other two. 
They will use the i parameter as an index to obtain the correct information to be transfered, 
then will iterate and continue until it catch up to the length of data. 
Thus explaining why we need the data parameter for the function.
-----------------------------------*/

const getContent = (data) => {
    const imgArray = Array.from(document.querySelectorAll("article > img"));
    const titleArray = Array.from(document.querySelectorAll("article > h3"));
    const descriptionArray = Array.from(document.querySelectorAll("article > p"));


    for(i = 0; i < data.length; i++){
        imgArray[i].setAttribute("src", `${data[i].imageUrl}`);
        imgArray[i].setAttribute("alt", `${data[i].altTxt}`);
        titleArray[i].textContent = `${data[i].name}`;
        descriptionArray[i].textContent = `${data[i].description}`;
    }
}