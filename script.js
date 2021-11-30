let imgArray = [];
let titleArray = [];
let descArray = [];
let lastshownprod;
let previousActiveElement;
const KEYCODE = {
    ESC: 27
};
const exbtn = document.querySelector(".exbtn");
const dialog = document.querySelector(".dialog");
const dialogimg = dialog.querySelector(".dialog__img");
const dialogtext = dialog.querySelector(".dialog__info");
const dialogmask = dialog.querySelector(".dialog__mask");
const shopwindow = dialog.querySelector("#shop-window");
const main = document.querySelector(".flex__products");
const sort = document.querySelector("#sort__option")
fetch("./images.json")
    .then((response) => response.json())

    .then((data) => {
        console.log(data);

        let imgData = data;

        imgData.forEach((images) => {
            let div = document.createElement("div");
            div.setAttribute("class", "shop-div");
            main.append(div);

            imgArray.push(images.url);
            titleArray.push(images.title);
            descArray.push(images.info);


            div.innerHTML += ` <div class='img__block'> <img class=${images.class} src=${images.url}>
        <h2>${images.title}</h2> <h3>Storlek: ${images.info.size}x${images.info.size1}cm     Pris: ${images.info.price}kr</h3></div>`;
        });

        let showimg = document.querySelectorAll(".popup-img");

        if (showimg) {
            showimg.forEach(function (img, index) {
                img.onclick = function () {
                    lastshownprod = index;
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

                    let size1 = document.createElement("p");
                    size1.setAttribute("class", "shop-popup-size");
                    dialogtext.appendChild(size1);

                    let inCart = document.createElement("span");
                    inCart.setAttribute("class", "in_cart");
                    dialogtext.appendChild(inCart)

                    let price = document.createElement("p");
                    price.setAttribute("class", "shop-popup-price");
                    dialogtext.appendChild(price);

                    let btn = document.createElement("button");
                    //btn.setAttribute("onclick", "Add-To-Cart()");//
                    btn.setAttribute("id", "shop-popup-btn");
                    dialogtext.appendChild(btn);
                    btn.innerHTML = "Köp";

                    img.setAttribute("src", imgArray[i]);
                    title.innerHTML = titleArray[i];
                    desc.innerHTML = descArray[i].description;
                    size.innerHTML = "Storlek: " + descArray[i].size + "x" + descArray[i].size1 + "cm";
                    price.innerHTML = "Pris: " + descArray[i].price + "kr";


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

                    for (let i=0; i < shopPopupBtn.length; i++) {
                        shopPopupBtn[i].addEventListener('click', () => {
                            cartNumbers(descArray[i]);
                        })
                    }

                    function onLoadCartNumbers () {
                        let productNumbers = localStorage.getItem('cartNumbers');

                        if(productNumbers){
                            document.querySelector('.btn__cart span').textContent = productNumbers;
                        }
                    }

                    function cartNumbers(descArray) {
                        
                        let productNumbers = localStorage.getItem('cartNumbers');

                        productNumbers = parseInt(productNumbers);

                        if ( productNumbers ) {
                            localStorage.setItem('cartNumbers', productNumbers + 1);
                            document.querySelector('.btn__cart span').textContent = productNumbers + 1;
                        } else {
                            localStorage.setItem('cartNumbers', 1);
                            document.querySelector('.btn__cart span').textContent = 1;
                        }

                       setItems(desc, price)
                    }

                    function setItems(desc, price) {
                        let cartItems = localStorage.getItem('productsInCart');

                        cartItems = JSON.parse(cartItems);
                        
                        descArray.inCart = 1;

                        cartItems = {
                            [descArray[i].description]: desc
                        }

                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                    }

                    onLoadCartNumbers();
                };
            });
        }


    });