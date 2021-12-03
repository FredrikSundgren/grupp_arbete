// Funktionerna för local storage shopping cart

const emptyCart = {};

function cartGet() {
  let cart = JSON.parse(localStorage.getItem("cart")) || emptyCart;

  return cart;
}

function cartSet(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function cartNumbers() {
  // Funktion som returnerar antal i varukorg
  let cart = cartGet();

  let totalNumberProductsInCart = Object.values(cart).reduce(
    (a, b) => a + b,
    0
  );

  return totalNumberProductsInCart;
}

function cartAddProduct(productIndex) {
  // Funktion som adderar en produkt till varukorg
  let cart = cartGet();

  let currentValue = cart[productIndex] || 0;

  cart[productIndex] = currentValue + 1;

  cartSet(cart);
}
