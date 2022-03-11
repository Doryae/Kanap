let params = new URL(document.location).searchParams;
let id = params.get("id");
const COLOR_SELECT = document.getElementById("colors");

//Au clic sur le bouton, il demarre la fonction addToCart
function addProduct() {
  const ADD_TO_CART = document.getElementById("addToCart");
  ADD_TO_CART.addEventListener("click", addToCart);
}

function addToCart(p) {
  let productToAdd = {
    idProduct: id,
    color: COLOR_SELECT.value,
    quantity: parseInt(document.getElementById("quantity").value),
  };

  //Gestion du localeStorage -- 
  //la console.log retourne une valeur null, tu peux checker pourquoi? 
  //et continuer le debbogage - on continue la discussion par mail
  let getStorage = JSON.parse(localStorage.getItem("produit"));
  console.log(getStorage); 


  if (getStorage !== null) {
    // Si le storage n'est pas vide
    // Variable comprenant la condition de couleur et id identique
    let cartNotEmpty = getStorage.find(
      (item) => item.idProduct === id && item.color === color
    );

    if (cartNotEmpty !== undefined) {
      //Si condition true alors ajout de la quantité en plus dans le localStorage
      let addQuantity = parseInt(productToAdd.quantity) + parseInt(cartNotEmpty.quantity);
      cartNotEmpty.quantity = addQuantity;
      localStorage.setItem("produits", JSON.stringify(getStorage));
    }
  } else {
    //Si le storage est vide alors push le 1er panier
    getStorage = [];
    getStorage.push(productToAdd);
    localStorage.setItem("produits", JSON.stringify(getStorage));
  }
}
// let product = {};

// let sameIdAndColor;

// let initialNumber = 0;
// let numberToAdd = 0;


// function saveCart(cart) {
//     let array = [];
//     array.push(localStorage.setItem("Produit", JSON.stringify(cart)));
//     console.log(typeof cart);
// }

// const addToCart = (p) => {
//     let cart = [];
//     console.log(typeof cart)
//     cart.push(p);

//     saveCart(cart);
// }

// const getCart = () => {
//     if(JSON.parse(localStorage.getItem("Produit")) == undefined){
//         return [];
//     }else {
//         return JSON.parse(localStorage.getItem("Produit"));
//     }
// }

// const addProduct = () => {

//     product = {
//         id: url.get("id"),
//         color: document.getElementById("colors").value,
//         quantity: parseInt(document.getElementById("quantity").value)
//     }


//     ifSameProduct();
    
//     if(sameIdAndColor){
//         console.log(typeof sameIdAndColor)
//         initialNumber = parseInt(sameIdAndColor.quantity);

//         numberToAdd = parseInt(product.quantity);

//         product.quantity = initialNumber + numberToAdd;
//         console.log(initialNumber + " " + numberToAdd);
//         console.log(product.quantity + " & " + typeof product.quantity);

//         saveCart(product);

//     }else {
//         console.log("else");
//         addToCart(product);
//     }

// }

// const ifSameProduct = () => {
//     let getStorage = JSON.parse(localStorage.getItem("Produit"));
//     if(getStorage == null){
//         return [];
//     }
//     sameIdAndColor = getStorage.find(p => p.id === product.id && p.color === product.color);
// }
/* --------------------------------- 
Ce dont j'ai besoin :
Récupérer l'id, la couleur et la quantité du produit lors du click sur le bouton, et le stocker dans le local storage. 
SI le même produit avec la même couleur est déjà dans le local storage, additionner les quantités plutôt que de créer un nouvel item
SINON créer un nouvel item comprenant les données de l'élément. 
-----------------------------------*/

