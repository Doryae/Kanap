let url = new URLSearchParams(window.location.search);

fetch("http://localhost:3000/api/products/" + url.get("id")) //get the data only from the items with the same value Id as the one we give
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    showImage(data);
    showInfos(data);
    colorsChoice(data);
  })
  .catch(function (err) {
    console.log("Erreur lors du chargement : Le serveur ne répond pas");
  });

/* --------------------------------- 
Create a balise img, then add the attribut src with the same value as the image from the product
Then, append this balise as a child of div class="item__img"
-----------------------------------*/

const showImage = (data) => {
  let createElement = document.createElement("img");
  createElement.setAttribute("src", `${data.imageUrl}`);
  createElement.setAttribute("alt", `${data.altTxt}`);
  document.querySelector("article > div.item__img").appendChild(createElement);
};

/* --------------------------------- 
Search the elements by ID and add the text contained in the keys : Name, Price, Description.
-----------------------------------*/

const showInfos = (data) => {
  document.getElementById("title").textContent = `${data.name}`;
  document.getElementById("price").textContent = `${data.price}`;
  document.getElementById("description").textContent = `${data.description}`;
};

/* --------------------------------- 
Search for how many colors is possible for the product, than for each of them create a balise option, 
add an attribute value that is equal to the colors in question. (defined by i as the index)
-----------------------------------*/

const colorsChoice = (data) => {
  for (i = 0; i < data.colors.length; i++) {
    let createOption = document.createElement("option");
    createOption.setAttribute("value", `${data.colors[i]}`);
    createOption.textContent = `${data.colors[i]}`;
    document.getElementById("colors").appendChild(createOption);
  }
};

/* --------------------------------- 
Add to cart section
-----------------------------------*/

/* --------------------------------- 
Necessity : When we click on the button, we need to obtain informations about the product...
So when we click, we call the function addToCart().
The informations that we will get by clicking on this button are : 
The  Id, the color value and the quantity.
Those informations will get stored in the local storage, so we can use them on other pages. 
-----------------------------------*/

document.getElementById("addToCart").addEventListener("click", function (e) {
  e.preventDefault();
  addToCart();
});

// Function that is called when we click on the button on the product.html page.

function addToCart() {
  //We get the element that are needed : Id / color / quantity. The last two are values selected by the user.
  let product = {
    id: url.get("id"), //will search the parameter "id" of the url, and return it's value.
    color: document.getElementById("colors").value, //will get the value of the id element colors.
    quantity: parseInt(document.getElementById("quantity").value), //will get the value of the id element quantity AND make it an integral number
  };

  // Function that will create a block where a message will appear to say what is lacking for adding a product in the cart
  // Or to mention that the product is well added to the cart.

  let errorAlert = "❌";
  let allClearAlert = "✔️";

  const createAlertMessage = () => {
    const mainBlock = document.querySelector("main .limitedWidthBlock");
    const createAlertBlock = document.createElement("div");
    const createAlertParagraph = document.createElement("p");
    const createCloseButton = document.createElement("button");

    if (document.querySelector(".alert") == null) {
      // if the div class="alert" doesn't exist, then create one on the page.
      mainBlock.appendChild(createAlertBlock);
      createAlertBlock.classList.add("blockAlert");
      createAlertBlock.appendChild(createAlertParagraph);
      createAlertParagraph.classList.add("alert");
      createAlertBlock.appendChild(createCloseButton);
      createCloseButton.classList.add("closeMsg");
      createCloseButton.textContent = "Fermer le message";

    } else {// if it exists already, we remove it so we can create a new one. So the alert messages won't stack, and it will not create an error in the console
      document.querySelector(".blockAlert").remove();
      mainBlock.appendChild(createAlertBlock);
      createAlertBlock.classList.add("blockAlert");
      createAlertBlock.appendChild(createAlertParagraph);
      createAlertParagraph.classList.add("alert");
      createAlertBlock.appendChild(createCloseButton);
      createCloseButton.classList.add("closeMsg");
      createCloseButton.textContent = "Fermer le message";
    }

    document.querySelector(".closeMsg").addEventListener("click", (e) => { // Close the alert message when we click on the button
      e.preventDefault();
      document.querySelector(".blockAlert").remove();
    });
  };
  // Set the conditions : Need a color selected and a number beetween 1 and 100.
  // If only one of the condition is not good : change the warning.
  if (
    product.color === "" &&
    (product.quantity < 1 || product.quantity > 100)
  ) {
    createAlertMessage();
    document.querySelector(
      ".alert"
    ).innerHTML = `${errorAlert} ${errorAlert} ${errorAlert}<br/>Veuillez Spécifier une couleur,<br/>Et un nombre d'article comprit entre 1 & 100`;
  } else {
    if (product.color === "") {
      createAlertMessage();
      document.querySelector(
        ".alert"
      ).innerHTML = `${errorAlert} ${errorAlert} ${errorAlert}<br/>Veuillez Spécifier une couleur.`;
    } else {
      if (product.quantity < 1) {
        createAlertMessage();
        document.querySelector(
          ".alert"
        ).innerHTML = `${errorAlert} ${errorAlert} ${errorAlert}<br/>Vous devez ajouter au moins un article.`;
      } else if (product.quantity > 100) {
        createAlertMessage();
        document.querySelector(
          ".alert"
        ).innerHTML = `${errorAlert} ${errorAlert} ${errorAlert}<br/>Vous ne pouvez ajouter plus de 100 produits dans le panier.`;
      } else {
        //We need to get the local storage so we can analyse what's inside (or not) to apply conditions
        let getLocalStorage = JSON.parse(localStorage.getItem("Produits")); //get the local storage with a JSON format (thanks to the JSON.parse)

        //First of all : is there already something on the local storage, or not ?
        if (getLocalStorage !== null) {
          //If the local storage is different then null, it means there is something in it.

          //If he's not empty, then we need to search if there is already the item we want to add to our cart. If there is, we just update the product.quantity
          //for that we need a function to search our array (that is : our local storage)

          let sameProduct = getLocalStorage.find(
            (item) => item.id === product.id && item.color === product.color
          );
          // If the items we are looking for is NOT in our local Storage, this function will return "undefined" (we can check it with the console.log)

          if (sameProduct !== undefined) {
            // => That means we HAVE the same item already in the local storage

            let totalQuantity =
              parseInt(product.quantity) + parseInt(sameProduct.quantity);
            if (totalQuantity > 100) { 
              // If the total quantity is superior to 100, then it will update the quantity to 100 and won't allow to increase it. (But will accept decrease)
              createAlertMessage();
              document.querySelector(
                ".alert"
              ).innerHTML = `${errorAlert} ${errorAlert} ${errorAlert}<br/>Le total de vos ajouts au panier sur ce même produit est supérieur à 100.
                <br/>Nous garderons donc 100 comme quantité pour votre panier.<br/>Vous pourrez modifier la quantité sur la page 'panier'.
                <br/>${allClearAlert} ${allClearAlert} ${allClearAlert}<br/>Votre Panier a été mis à jour.`;
              sameProduct.quantity = 100;
            } else {
              sameProduct.quantity = totalQuantity; // will change the quantity in the local storage for the total.
              createAlertMessage();
              document.querySelector(
                ".alert"
              ).innerHTML = `${allClearAlert} ${allClearAlert} ${allClearAlert}<br/>Votre Panier a été mis à jour.`;
            }
            localStorage.setItem("Produits", JSON.stringify(getLocalStorage)); //We save this. (need to stringify, because LocalStorage don't get some elements like array or object.)
          } else {
            //We are still in the first "if" (if NOT null), meaning that if there is something on the local storage but it ISN T the same product, then we need to add him to our cart
            getLocalStorage.push(product); //we push the product, that will create another object in the array.
            localStorage.setItem("Produits", JSON.stringify(getLocalStorage));
            createAlertMessage();
            document.querySelector(
              ".alert"
            ).innerHTML = `${allClearAlert} ${allClearAlert} ${allClearAlert}<br/>Votre Panier a été mis à jour.`;
          }
        } else {
          // We aren't in the first "if", then it means that localStorage is NULL.
          getLocalStorage = []; // We create an empty array in which we will stock our objects.
          // We push it and save it in the local Storage.
          getLocalStorage.push(product);
          localStorage.setItem("Produits", JSON.stringify(getLocalStorage));
          createAlertMessage();
          document.querySelector(
            ".alert"
          ).innerHTML = `${allClearAlert} ${allClearAlert} ${allClearAlert}<br/>Votre Panier a été mis à jour.`;
        }
      }
    }
  }
}