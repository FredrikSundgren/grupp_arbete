// Index.html page script

let imgArray = [];
let prodArray = [];
let lastshownprod;
let previousActiveElement;
const KEYCODE = {
  ESC: 27,
};
const exbtn = document.querySelector(".exbtn");
const dialog = document.querySelector(".dialog");
const dialogimg = dialog.querySelector(".dialog__img");
const dialogtext = dialog.querySelector(".dialog__info");
const dialogmask = dialog.querySelector(".dialog__mask");
const shopwindow = dialog.querySelector("#shop-window");
const main = document.querySelector(".flex__products");
const sort = document.querySelector("#sort__option");

fetch("./images.json")
  .then((response) => response.json())

  .then((data) => {
    let imgData = data;

    imgData.forEach((images) => {
      let div = document.createElement("div");
      div.setAttribute("class", "shop-div");
      main.append(div);

      imgArray.push(images.url);
      prodArray.push(images);

      div.innerHTML += ` <div class='img__block'> <img class=${images.class} src=${images.url}>
            <h2>${images.title}</h2> <h3>Storlek: ${images.info.size}x${images.info.size1}cm     Pris: ${images.info.price}kr</h3></div>`;
    });

    let showimg = document.querySelectorAll(".popup-img");
    if (!showimg) {
      return;
    }

    showimg.forEach(function (img, productIndex) {
      img.onclick = function () {
        lastshownprod = productIndex;
        let i = lastshownprod;
        popUpWindow();

        let title = document.createElement("h2");
        title.setAttribute("class", "shop-popup-title");
        dialogtext.appendChild(title);

        let img = document.createElement("img");
        img.setAttribute("class", "shop-popup-img");
        dialogimg.appendChild(img);

        let desc = document.createElement("p");
        desc.setAttribute("class", "shop-popup-desc");
        dialogtext.appendChild(desc);

        let size = document.createElement("p");
        size.setAttribute("class", "shop-popup-size");
        dialogtext.appendChild(size);

        let price = document.createElement("p");
        price.setAttribute("class", "shop-popup-price");
        dialogtext.appendChild(price);

        let incart = document.createElement("p");
        dialogtext.appendChild(incart);

        let btn = document.createElement("button");
        btn.setAttribute("id", "shop-popup-btn");
        dialogtext.appendChild(btn);
        btn.innerHTML = "Köp";

        img.setAttribute("src", imgArray[i]);
        title.innerHTML = prodArray[i].title;
        desc.innerHTML = prodArray[i].info.description;
        size.innerHTML =
          "Storlek: " +
          prodArray[i].info.size +
          "x" +
          prodArray[i].info.size1 +
          "cm";
        price.innerHTML = "Pris: " + prodArray[i].info.price + "kr";

        function popUpWindow() {
          previousActiveElement = document.activeElement;

          dialog.classList.add("opened");

          dialogmask.addEventListener("click", closeDialog);
          exbtn.addEventListener("click", closeDialog);
          document.addEventListener("keydown", checkCloseDialog);

          dialog.querySelector(".exbtn").focus();
        }

        function checkCloseDialog(press) {
          if (press.keyCode === KEYCODE.ESC) closeDialog();
        }

        function closeDialog() {
          dialogmask.removeEventListener("click", closeDialog);
          exbtn.removeEventListener("click", closeDialog);
          document.removeEventListener("keydown", checkCloseDialog);
          document.querySelector("#shop-popup-btn").remove();

          dialogtext.innerHTML = "";
          dialogimg.innerHTML = "";

          dialog.classList.remove("opened");
          previousActiveElement.focus();
        }

        // add to cart //
        let shopPopupBtn = document.querySelectorAll("#shop-popup-btn");

        for (let i = 0; i < shopPopupBtn.length; i++) {
          shopPopupBtn[i].addEventListener("click", () => {
            onClickBuyProduct(productIndex);
          });
        }
      };
    });
  });

function onClickBuyProduct(productIndex) {
  cartAddProduct(productIndex);
  onCartUpdated();
}

function onCartUpdated() {
  let productNumbers = cartNumbers();
  document.querySelector(".btn__cart span").textContent = productNumbers;
}

onCartUpdated();
