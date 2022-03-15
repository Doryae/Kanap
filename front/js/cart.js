// Function that is called when we click on the button on the product.html page.

function addToCart() {

    //We get the element that are needed : Id / color / quantity. The last two are values selected by the user.
    let product = {
        id: url.get("id"), //will search the parameter "id" of the url, and return it's value.
        color: document.getElementById("colors").value, //will get the value of the id element colors.
        quantity: parseInt(document.getElementById("quantity").value) //will get the value of the id element quantity AND make it an integral number
    }

    //We need to get the local storage so we can analyse what's inside (or not) to apply conditions
    let getLocalStorage = JSON.parse(localStorage.getItem("Produits")); //get the local storage with a JSON format (thanks to the JSON.parse)

    //First of all : is there already something on the local storage, or not ?
    if (getLocalStorage !== null) { //If the local storage is different then null, it means there is something in it. 

        //If he's not empty, then we need to search if there is already the item we want to add to our cart. If there is, we just update the product.quantity
        //for that we need a function to search our array (that is : our local storage)

        let sameProduct = getLocalStorage.find(item => item.id === product.id && item.color === product.color); 
        // If the items we are looking for is NOT in our local Storage, this function will return "undefined" (we can check it with the console.log)
        
        if (sameProduct !== undefined) { // => That means we HAVE the same item already in the local storage

            let totalQuantity = parseInt(product.quantity) + parseInt(sameProduct.quantity);
            sameProduct.quantity = totalQuantity; // will change the quantity in the local storage for the total.
            localStorage.setItem("Produits", JSON.stringify(getLocalStorage)); //We save this. (need to stringify, because LocalStorage don't get some elements like array or object.)
        } else {
            //We are still in the first "if" (if NOT null), meaning that if there is something on the local storage but it ISN T the same product, then we need to add him to our cart
            getLocalStorage.push(product); //we push the product, that will create another object in the array.
            localStorage.setItem("Produits", JSON.stringify(getLocalStorage));
        }

    } else { // We aren't in the first "if", then it means that localStorage is NULL. 
        getLocalStorage = []; // We create an empty array in which we will stock our objects.
        getLocalStorage.push(product); 
        localStorage.setItem("Produits", JSON.stringify(getLocalStorage));
    }

}

/* --------------------------------- 
We fetch the data from the API
-----------------------------------*/

//we get the localStorage
let getStorage = JSON.parse(localStorage.getItem("Produits"));


// fetch('http://localhost:3000/api/products/') //get the data only from the items with the same value Id as the one we give
//     .then(function(data){
//         return data.json();
//     })
//     .then(function(data){
//         console.log(data);

//         let getData = Array.from(document.querySelectorAll("article"));
//         let arrayData = [];


//         // for(i = 0; i < getData.length; i++) {
//         //     let dataId = getData[i].getAttribute("data-id");
//         //     let dataColor = getData[i].getAttribute("data-color");
//         //     let data = {
//         //         id: `${dataId}`,
//         //         color: `${dataColor}`
//         //     }
//         //     arrayData.push(data);
//         // }


//         let allImg = document.querySelectorAll(".cart__item__img > img")

//         let sameProduct = getLocalStorage.find(item => item.id === data.id)
//         console.log(sameProduct)



//         // for( i = 0; i < data.length; i++) {
//         //     //si l'image à la même id que l'id du storage alors =>
//         //     if(getStorage[i].id === data[i]._id){
//         //         allImg[i].setAttribute("src", `${data[i].imageUrl}`)
//         //     }
//         // }
                


//     })
//     .catch(function(err){
//         console.log("Erreur lors du chargement : Le serveur ne répond pas");
//     })




/* --------------------------------- 
Starting the cart.html 
    => Need to Show each items stocked in the local storages, and the following elements :
        The product - id, image, name, color, price, the quantity (that need to be reverified if the user change it).
the pagination is like this =>             
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p class="cart__price">  ---> What I modified a little.
                <span class = "unity">42,00 €</span>
                <span class = "total"> x €</span>
            </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    </section>
I'll add a "price unity" and "article price", adding a class "cart__price" for the css.
-----------------------------------*/

let numberOfDifferentProduct = JSON.parse(localStorage.getItem("Produits"));
let cartElement;
let cartSecondElement;
let cartThirdElement;

const cartPagination = () => {

    pageSkeleton();
    appendDiv();
    itemDescription();
    itemSettings();

}

const pageSkeleton = () => {

    cartElement = document.createElement("article");
    document.getElementById("cart__items").appendChild(cartElement);
    cartElement.classList.add("cart__item");

    const arrayArticle = document.querySelectorAll("section > article");

    for(i = 0; i < arrayArticle.length; i++) {

        cartElement.setAttribute("data-id", `${getStorage[i].id}`);
        cartElement.setAttribute("data-color", `${getStorage[i].color}`);

    }

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    for(let article of arrayArticle) {

        article.appendChild(cartElement); 
        cartElement.classList.add("cart__item__img");
        article.appendChild(cartSecondElement); 
        cartSecondElement.classList.add("cart__item__content");

    }

    cartElement = document.createElement("img");

    const arrayDivImg = document.querySelectorAll("article > div.cart__item__img");

    for(let div of arrayDivImg) {
        div.appendChild(cartElement);
    }

}

const appendDiv = () => {

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    const arrayDivContent = document.querySelectorAll("div.cart__item__content");

    for(let div of arrayDivContent) {
        div.appendChild(cartElement);
        cartElement.classList.add("cart__item__content__description"); 
        div.appendChild(cartSecondElement);
        cartSecondElement.classList.add("cart__item__content__settings"); 
    }

}

const itemDescription = () => {

    cartElement = document.createElement("h2");
    cartSecondElement = document.createElement("p");
    cartThirdElement = document.createElement("p");

    const arrayDivDescription = document.querySelectorAll(".cart__item__content__description");

    for(let elements of arrayDivDescription) {
        elements.appendChild(cartElement);
        elements.appendChild(cartSecondElement);
        elements.appendChild(cartThirdElement);
        cartThirdElement.classList.add("cart__price");
    }

}

const itemSettings = () => {

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    const arraySettings = document.querySelectorAll(".cart__item__content__settings");

    for(let div of arraySettings) {
        div.appendChild(cartElement); 
        cartElement.classList.add("cart__item__content__settings__quantity");
        div.appendChild(cartSecondElement); 
        cartSecondElement.classList.add("cart__item__content__settings__delete");
    }

    cartElement = document.createElement("p");
    cartSecondElement = document.createElement("input");

    const arraySettingsQuantity = document.querySelectorAll(".cart__item__content__settings__quantity");

    for(let elements of arraySettingsQuantity) {
        elements.appendChild(cartElement);
        elements.appendChild(cartSecondElement);
        cartSecondElement.classList.add("itemQuantity");
        cartSecondElement.setAttribute("type", "number");
        cartSecondElement.setAttribute("name", "itemQuantity");
        cartSecondElement.setAttribute("min", "1");
        cartSecondElement.setAttribute("max", "100");
    }

    const arrayOfInput = document.querySelectorAll(".cart__item__content__settings__quantity > input");
    
    for(i = 0; i < arrayOfInput.length; i++) {
        arrayOfInput[i].setAttribute("value", `${getStorage[i].quantity}`)
    }


    cartThirdElement = document.createElement("p");
    const arraySettingsDelete = document.querySelectorAll(".cart__item__content__settings__delete");

    for(let p of arraySettingsDelete) {
        p.appendChild(cartThirdElement);
        cartThirdElement.classList.add("deleteItem")
    }

}

getStorage.forEach(element => {
    cartPagination();
});

const getElement = () => {

    let getData = Array.from(document.querySelectorAll("article"));
    let getImg = document.querySelectorAll(".cart__item__img > img");
    console.log(getImg);
    
    for(i = 0; i < getData.length; i++) {

        fetch('http://localhost:3000/api/products/' + `${getData[i].getAttribute("data-id")}`)
            .then(function(data){
                return data.json();
            })
            .then(function(data){
                console.log(data);
                getImg[i].setAttribute("src", `${data[i].imageUrl}`)

            })
            .catch(function(err){
                console.log("Erreur de Fetch")
            })
    }
}
