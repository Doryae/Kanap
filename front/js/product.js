let url = new URLSearchParams(window.location.search);

fetch('http://localhost:3000/api/products/' + url.get("id")) //get the data only from the items with the same value Id as the one we give
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        showImage(data);
        showInfos(data);
        colorsChoice(data);
        
    })
    .catch(function(err){
        console.log("Erreur lors du chargement : Le serveur ne répond pas");
    })

/* --------------------------------- 
Create a balise img, then add the attribut src with the same value as the image from the product
Then, append this balise as a child of div class="item__img"
-----------------------------------*/

const showImage = (data) => {
    let createElement = document.createElement("img");
    createElement.setAttribute("src", `${data.imageUrl}`);
    createElement.setAttribute("alt", `${data.altTxt}`);
    document.querySelector("article > div.item__img").appendChild(createElement);
}

/* --------------------------------- 
Search the elements by ID and add the text contained in the keys : Name, Price, Description.
-----------------------------------*/

const showInfos = (data) => {
    document.getElementById("title").textContent = `${data.name}`;
    document.getElementById("price").textContent = `${data.price}`;
    document.getElementById("description").textContent = `${data.description}`;
}

/* --------------------------------- 
Search for how many colors is possible for the product, than for each of them create a balise option, 
add an attribute value that is equal to the colors in question. (defined by i as the index)
-----------------------------------*/

const colorsChoice = (data) => {
    for(i = 0; i < data.colors.length; i++){
        let createOption = document.createElement("option");
        createOption.setAttribute("value", `${data.colors[i]}`);
        createOption.textContent = `${data.colors[i]}`;
        document.getElementById("colors").appendChild(createOption);       
    }
}

/* --------------------------------- 
Add to cart section
-----------------------------------*/

/* --------------------------------- 
Necessity : When we click on the button, we need to obtain informations about the product...
So when we click, we call the function addToCart() in cart.js (we need to load it on the product.html, or it won't work.)
The informations that we will get by clicking on this button are : 
The  Id, the color value and the quantity.
Those informations will get stored in the local storage, so we can use them on other pages. 
-----------------------------------*/


document.getElementById("addToCart").addEventListener("click", function(e){
    e.preventDefault();
    addToCart();
})
