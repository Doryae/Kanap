
function saveAddedProduct() {
    localStorage.setItem("Produit", JSON.stringify(this));
}

function getAddedProduct(id) {
    const lol = fetch("http://localhost:3000/api/products" + id)
    const data = JSON.parse(lol); 
    if(!id) {
        throw "error";
    } else {
        return data;
    }
}

function addProduct(productAdded) {
    let cart = getAddedProduct(productAdded);
    cart.push(productAdded);
    saveAddedProduct(productAdded);
}

function test() {
    console.log("test")
};
