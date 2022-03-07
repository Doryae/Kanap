function saveAddedProduct() {
  localStorage.setItem("Produit", JSON.stringify(this));
}

/**
 * Get a product stored in the cart.
 * @param {string} productId - The id of the desired product.
 * @param {string} color - The color of the desired product.
 * @returns {CartProduct} The desired product.
 */
function getAddedProduct(productId, color) {
  return this.products.find(
    (cartProduct) =>
      cartProduct.productId === productId && cartProduct.color === color
  );
}

function addProduct(productAdded) {
  const productId = productAdded.productId;

  //tu peux ajouter ici la condition sur la quantité et la couleur

  return this.getAddedProduct(productId, productToAdd.color);
}

function test() {
  console.log("test");
}
