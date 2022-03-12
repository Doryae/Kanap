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