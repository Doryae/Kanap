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