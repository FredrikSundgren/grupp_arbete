// shoppingcart.html page script

fetch("./images.json")
  .then((response) => response.json())

  .then((data) => {
    let imgData = data;

    function onCartUpdated() {
      let cart = cartGet();

      let cartContainer = document.querySelector(".cart-products");
      let cartInTotal = document.querySelector(".cart-in-total");

      cartContainer.innerHTML = "";
      Object.keys(cart).forEach((productIndex) => {
        let product = data[productIndex];
        let numInCart = cart[productIndex];

        cartContainer.innerHTML += `
                <div class="cart-products-wrapper>
                    <div class="cart-flex">
                        <div class="cart-item-flex">
                            <div class="product-title">${product.title}</div>
                            <div class="price">${product.info.price},00 kr</div>
                            <div class="quantity">
                                <ion-icon name="remove-circle-outline" name="minus"></ion-icon>
                                <span>${numInCart}</span>
                                <ion-icon name="add-circle-outline" name="plus"></ion-icon>
                            </div>
                            <div class="total">
                                ${numInCart * product.info.price},00 kr
                            </div>
                        </div>
                    </div>
                </div>
                    `;
      });

      let cartTotal = Object.keys(cart)
        .map((productIndex) => {
          let product = data[productIndex];
          let numInCart = cart[productIndex];

          return numInCart * product.info.price;
        })
        .reduce((a, b) => a + b, 0);

      cartInTotal.innerHTML += `
                    <h3 class="shop-total">${cartTotal},00 kr</h3>
                `;
    }

    onCartUpdated();
  });
