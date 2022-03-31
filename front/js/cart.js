

/* --------------------------------- 
We fetch the data from the API
-----------------------------------*/

//we get the localStorage
let getStorage = JSON.parse(localStorage.getItem("Produits"));


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
            <p class="cart-price">  ---> What I modified a little.
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
I'll add a "price unity" and "article price", adding a class "cart-price" for the css.
-----------------------------------*/

let numberOfDifferentProduct = JSON.parse(localStorage.getItem("Produits"));
let cartElement;
let cartSecondElement;
let cartThirdElement;

// If the localStorage is empty, it will return a text that says : there is no product in your cart.
// Else, if the localStorage is NOT empty, it will run the rest of the code.

if(getStorage === null) {
    cartElement = document.createElement("article");
    document.getElementById("cart__items").appendChild(cartElement);
    cartElement.textContent = "Vous n'avez ajouté aucun produit à votre panier."
} else {


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
        cartSecondElement.classList.add("cart-color");
        elements.appendChild(cartThirdElement);
        cartThirdElement.classList.add("cart-price");
    }

    cartElement = document.createElement("span");
    cartSecondElement = document.createElement("span");

    const arrayPrice = document.querySelectorAll(".cart-price");

    for(let span of arrayPrice) {
        span.appendChild(cartElement);
        span.appendChild(cartSecondElement);
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
        cartThirdElement.classList.add("deleteItem");
        cartThirdElement.textContent = "Supprimer";
    }

};


getStorage.forEach(element => {
    cartPagination();
});

let getData = Array.from(document.querySelectorAll("article"));

async function getElement() {

    let arrayProduct = [];

    for(i = 0; i < getData.length; i++) {


        const response = await fetch('http://localhost:3000/api/products/' + `${getData[i].getAttribute("data-id")}`)
            .then(function(data){
                return data.json();
            })
            .then(function(data){
                arrayProduct.push(data);
            })
            .catch(function(err){
                console.log("Erreur de Fetch")
            });
        };


        dataProduct = arrayProduct;

        
    }


let getImg = document.querySelectorAll(".cart__item__img > img");
let dataProduct = [];




let h2 = document.querySelectorAll(".cart__item__content__description > h2");
let pDesc = document.querySelectorAll(".cart-color");
let pPriceUnity = document.querySelectorAll(".cart-price :first-child");
let pPriceTotal = document.querySelectorAll(".cart-price :nth-child(2)");
let inputQuantity = document.querySelectorAll(".cart__item__content__settings__quantity > input ")
let totalQuantity = 0;
let totalPrice = 0;

function cartDisplay() {
    
    
    for(x = 0; x < getData.length; x++) {

        getImg[x].setAttribute("src", `${dataProduct[x].imageUrl}`);
        h2[x].textContent = `${dataProduct[x].name}`;
        pDesc[x].textContent = `${getStorage[x].color}`;
        pPriceUnity[x].textContent = `${dataProduct[x].price}€ / unité`;
        pPriceTotal[x].textContent = `${dataProduct[x].price * getStorage[x].quantity}€ / total`;
        getStorage[x].quantity = inputQuantity[x].value; 
        document.getElementById("totalQuantity").textContent = `${totalQuantity += parseInt(getStorage[x].quantity)}`;
        document.getElementById("totalPrice").textContent = `${totalPrice += parseInt(dataProduct[x].price * getStorage[x].quantity)}`;

    }
}

const displayElement = () => {

    getElement()
        .then(function(){
            cartDisplay()
        });

}

displayElement();

// Modify the quantity of a selected item from the cart and change it in the local Storage (and actualise the page)


let changeQuantity = document.querySelectorAll(".itemQuantity");
console.log(changeQuantity)

for(let q = 0; q < changeQuantity.length; q++) {

    changeQuantity[q].addEventListener("change", function(e){

        let quantityValue = parseInt(changeQuantity[q].value);
        getStorage[q].quantity = quantityValue;
        localStorage.setItem("Produits", JSON.stringify(getStorage));
        location.reload();

    })
}

// Delete a selected item from the cart (and actualise the page)

let item = document.querySelectorAll(".deleteItem");

for(let d = 0; d < item.length; d++) {
    item[d].addEventListener("click", function(e){

        getStorage.splice(d, 1);
        localStorage.setItem("Produits", JSON.stringify(getStorage));
        location.reload();

    })
}

// Delete all the items in one click thanks to the button added in cart.html (see the modification section)

let clearCart = document.getElementById("delete-all");

clearCart.addEventListener("click", function(e) {
    
    e.preventDefault();
    localStorage.clear();
    location.reload();

})

}