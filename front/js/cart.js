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

if (getStorage === null || getStorage.length === 0) {
  cartElement = document.createElement("article");
  document.getElementById("cart__items").appendChild(cartElement);
  cartElement.textContent = "Vous n'avez ajouté aucun produit à votre panier.";
} else {
  const cartPagination = () => {
    // function that call the others functions to establish the pagination of the html

    pageSkeleton();
    appendDiv();
    itemDescription();
    itemSettings();
  };

  const pageSkeleton = () => {
    // create the article element, append it a div with an img balise within. + all the attributes.

    cartElement = document.createElement("article");
    document.getElementById("cart__items").appendChild(cartElement);
    cartElement.classList.add("cart__item");

    const arrayArticle = document.querySelectorAll("section > article");

    for (i = 0; i < arrayArticle.length; i++) {
      cartElement.setAttribute("data-id", `${getStorage[i].id}`);
      cartElement.setAttribute("data-color", `${getStorage[i].color}`);
    }

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    for (let article of arrayArticle) {
      article.appendChild(cartElement);
      cartElement.classList.add("cart__item__img");
      article.appendChild(cartSecondElement);
      cartSecondElement.classList.add("cart__item__content");
    }

    cartElement = document.createElement("img");

    const arrayDivImg = document.querySelectorAll(
      "article > div.cart__item__img"
    );

    for (let div of arrayDivImg) {
      div.appendChild(cartElement);
    }
  };

  const appendDiv = () => {
    // create the two divs that will be used for information about the product

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    const arrayDivContent = document.querySelectorAll(
      "div.cart__item__content"
    );

    for (let div of arrayDivContent) {
      div.appendChild(cartElement);
      cartElement.classList.add("cart__item__content__description");
      div.appendChild(cartSecondElement);
      cartSecondElement.classList.add("cart__item__content__settings");
    }
  };

  const itemDescription = () => {
    // focus on the div "content description"

    cartElement = document.createElement("h2");
    cartSecondElement = document.createElement("p");
    cartThirdElement = document.createElement("p");

    const arrayDivDescription = document.querySelectorAll(
      ".cart__item__content__description"
    );

    for (let elements of arrayDivDescription) {
      elements.appendChild(cartElement);
      elements.appendChild(cartSecondElement);
      cartSecondElement.classList.add("cart-color");
      elements.appendChild(cartThirdElement);
      cartThirdElement.classList.add("cart-price");
    }

    cartElement = document.createElement("span");
    cartSecondElement = document.createElement("span");

    const arrayPrice = document.querySelectorAll(".cart-price");

    for (let span of arrayPrice) {
      span.appendChild(cartElement);
      span.appendChild(cartSecondElement);
    }
  };

  const itemSettings = () => {
    // focus on the div "content settings"

    cartElement = document.createElement("div");
    cartSecondElement = document.createElement("div");

    const arraySettings = document.querySelectorAll(
      ".cart__item__content__settings"
    );

    for (let div of arraySettings) {
      div.appendChild(cartElement);
      cartElement.classList.add("cart__item__content__settings__quantity");
      div.appendChild(cartSecondElement);
      cartSecondElement.classList.add("cart__item__content__settings__delete");
    }

    cartElement = document.createElement("p");
    cartSecondElement = document.createElement("input");

    const arraySettingsQuantity = document.querySelectorAll(
      ".cart__item__content__settings__quantity"
    );

    for (let elements of arraySettingsQuantity) {
      elements.appendChild(cartElement);
      elements.appendChild(cartSecondElement);
      cartSecondElement.classList.add("itemQuantity");
      cartSecondElement.setAttribute("type", "number");
      cartSecondElement.setAttribute("name", "itemQuantity");
      cartSecondElement.setAttribute("min", "1");
      cartSecondElement.setAttribute("max", "100");
    }

    const arrayOfInput = document.querySelectorAll(
      ".cart__item__content__settings__quantity > input"
    );

    for (i = 0; i < arrayOfInput.length; i++) {
      arrayOfInput[i].setAttribute("value", `${getStorage[i].quantity}`);
    }

    cartThirdElement = document.createElement("p");
    const arraySettingsDelete = document.querySelectorAll(
      ".cart__item__content__settings__delete"
    );

    for (let p of arraySettingsDelete) {
      p.appendChild(cartThirdElement);
      cartThirdElement.classList.add("deleteItem");
      cartThirdElement.textContent = "Supprimer";
    }
  };

  // For each element in the localStorage : will create a product article who will contain everything seen above. Img, descriptions, etc...

  getStorage.forEach((element) => {
    cartPagination();
  });

  /* ------------------------------------- 
 We fetch the data -By id- from the API
--------------------------------------*/

  let getData = Array.from(document.querySelectorAll("article"));

  async function getElement() {
    let arrayProduct = [];

    for (i = 0; i < getData.length; i++) {
      const response = await fetch(
        "http://localhost:3000/api/products/" +
          `${getData[i].getAttribute("data-id")}`
      )
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          arrayProduct.push(data);
        })
        .catch(function (err) {
          console.log("Erreur de Fetch");
        });
    }

    dataProduct = arrayProduct;
  }

  let getImg = document.querySelectorAll(".cart__item__img > img");
  let dataProduct = [];

  let h2 = document.querySelectorAll(".cart__item__content__description > h2");
  let pDesc = document.querySelectorAll(".cart-color");
  let pPriceUnity = document.querySelectorAll(".cart-price :first-child");
  let pPriceTotal = document.querySelectorAll(".cart-price :nth-child(2)");
  let inputQuantity = document.querySelectorAll(
    ".cart__item__content__settings__quantity > input "
  );
  let totalQuantity = 0;
  let totalPrice = 0;

  // For each item in Local Storage, will search for each parameters and apply it to the pages. Like the name, or the price.

  function cartDisplay() {
    for (x = 0; x < getData.length; x++) {
      getImg[x].setAttribute("src", `${dataProduct[x].imageUrl}`);
      h2[x].textContent = `${dataProduct[x].name}`;
      pDesc[x].textContent = `${getStorage[x].color}`;
      pPriceUnity[x].textContent = `${dataProduct[x].price}€ / unité`;
      pPriceTotal[x].textContent = `${
        dataProduct[x].price * getStorage[x].quantity
      }€ / total`;
      getStorage[x].quantity = inputQuantity[x].value;
      document.getElementById(
        "totalQuantity"
      ).textContent = `${(totalQuantity += parseInt(getStorage[x].quantity))}`;
      document.getElementById("totalPrice").textContent = `${(totalPrice +=
        parseInt(dataProduct[x].price * getStorage[x].quantity))}`;
    }
  }

  // We fetch the data with getElement, then we wait for the entirety of the data to be processed. THEN we call the cartDisplay function.
  const displayElement = () => {
    getElement().then(function () {
      cartDisplay();
    });
  };

  displayElement();

  // Modify the quantity of a selected item from the cart and change it in the local Storage (and actualise the page)

  let changeQuantity = document.querySelectorAll(".itemQuantity");

  for (let q = 0; q < changeQuantity.length; q++) {
    changeQuantity[q].addEventListener("change", function (e) {
      let quantityValue = parseInt(changeQuantity[q].value);

      if (changeQuantity[q].value > 100) {
        // If the user want to add more then 100
        alert(
          "Vous ne pouvez commander plus de 100 fois le même produit,\nMerci de votre compréhension."
        );
        getStorage[q].quantity = 100;
      } else if (changeQuantity[q].value < 1) {
        //if the user want to add less then 1
        alert(
          "Le nombre du produit selectionné doit être comprit entre 1 & 100."
        );
      } else {
        getStorage[q].quantity = quantityValue;
      }
      localStorage.setItem("Produits", JSON.stringify(getStorage));
      location.reload();
    });
  }

  // Delete a selected item from the cart (and actualise the page)

  let item = document.querySelectorAll(".deleteItem");

  for (let d = 0; d < item.length; d++) {
    item[d].addEventListener("click", function (e) {
      getStorage.splice(d, 1);
      localStorage.setItem("Produits", JSON.stringify(getStorage));
      location.reload();
    });
  }

  // Delete all the items in one click thanks to the button added in cart.html (see the modification section)

  let clearCart = document.getElementById("delete-all");

  clearCart.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
  });
}

/* ------------------------------------- 
Form - Regular Expression --START--
--------------------------------------*/

//FirstName Input

let firstName = document.getElementById("firstName");

const validFirstName = (firstNameInput) => {

  let firstNameRegExp = /^[a-zæ]{1}[a-z-'éèñïíøæ\s]{2,15}$/ig;
  let firstNameTest = firstNameRegExp.test(firstNameInput.value);
  let errorMsg = document.getElementById("firstNameErrorMsg");

  if (firstNameTest != true) {
    errorMsg.textContent =
      "Lettre uniquement. Maximum de 13 caractères.";
  }else {
      errorMsg.textContent = " ";
  }
};

firstName.addEventListener("change", function () {
  validFirstName(this);
});

//LastName Input

let lastName = document.getElementById("lastName");

const validLastName = (lastNameInput) => {

  let lastNameRegExp = /^[a-zæ]{1}[a-z-'éèñïíøæ\s]{3,20}$/ig;
  let lastNameTest = lastNameRegExp.test(lastNameInput.value);
  let errorMsg = document.getElementById("lastNameErrorMsg");

  if (lastNameTest != true) {
    errorMsg.textContent = 
     "Lettre uniquement. Maximum 20 caractères.";
  }else {
    errorMsg.textContent = " ";
  }
};

lastName.addEventListener("change", function() {
  validLastName(this);
});

//Address Input

let address = document.getElementById("address");

const validAddress = (addressInput) => {

  let addressRegExp = /^\d{1,3}\s?(boite|bte|b|\/)?[\s,-]?(\d){0,3}?([\s,-]+)?[\D\s,\.]{3,30}[\d]{4,5}$/ig;
  let addressTest = addressRegExp.test(addressInput.value);
  let errorMsg = document.getElementById("addressErrorMsg");

  if (addressTest != true) {
    errorMsg.textContent =
     "Veuillez indiquer votre adresse.";
  }else {
    errorMsg.textContent = " ";
  }

};

address.addEventListener("change", function() {
  validAddress(this);
});

//City Input

let city = document.getElementById("city");

const validCity = (cityInput) => {

  let cityRegExp = /^[a-zé]{1}[a-z-'éèùçà]{2,24}$/ig;
  let cityTest = cityRegExp.test(cityInput.value);
  let errorMsg = document.getElementById("cityErrorMsg");

  if (cityTest != true) {
    errorMsg.textContent = "Veuillez indiquer votre ville";
  } else {
    errorMsg.textContent = " ";
  }

};

city.addEventListener("change", function() {
  validCity(this);
});

//Email Input

let email = document.getElementById("email");

const validEmail = (emailInput) => {

  let emailRegExp = /^[a-z0-9]{1}[a-z0-9-_\.]{3,20}@[a-z0-9-_]{3,15}(\.[a-z0-9]{3,10})?\.[a-z]{2,3}$/ig;
  let emailTest = emailRegExp.test(emailInput.value);
  let errorMsg = document.getElementById("emailErrorMsg");

  if (emailTest != true) {
    errorMsg.textContent = "Veuillez indiquer une adrese Email valide";
  } else {
    errorMsg.textContent = " ";
  }

};

email.addEventListener("change", function() {
  validEmail(this);
});

/* ------------------------------------- 
Form - Regular Expression -- END --
--------------------------------------*/

let order = document.getElementById("order");

order.addEventListener("click", function(e) {
  e.preventDefault();

  if(firstNameErrorMsg.textContent != " " || lastNameErrorMsg.textContent != " " || addressErrorMsg.textContent != " " || cityErrorMsg.textContent != " " || emailErrorMsg.textContent != " ") {
    alert("Veuillez renseigner CORRECTEMENT tout les champs du formulaire.");
  } else {
    if (getStorage === null || getStorage.length === 0) {
      alert("Veuillez ajouter un produit avant de passer commande !")
    } else {
  
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      }
    
      let products = [];
    
      for (let i = 0; i < getStorage.length; i++) {
        products.push(getStorage[i].id);
      }
    
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact,
          products
        })
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        let orderId = data.orderId;
  
        window.location.href = "confirmation.html?id=" + orderId;
      })
      .catch(error => console.log(error));
  
      localStorage.clear();
    }
  }


});
