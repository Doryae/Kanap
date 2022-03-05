
function saveAddedProduct() {
    localStorage.setItem("Produit", JSON.stringify(this));
}

function addProduct(productAdded) {
    let cart = getAddedProduct(productAdded);
    cart.push(productAdded);
    saveAddedProduct(productAdded);
}

function test() {
    console.log("test")
};
