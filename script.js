let imgArray = [];
let titleArray = [];
let descArray = [];

fetch("./images.json")
    .then((response) => response.json())

.then((data) => {
    console.log(data);

    let imgData = data;

    imgData.forEach(images =>
        {
            let div = document.createElement("div");
            div.setAttribute("class", "shop-div");
            document.body.appendChild(div);

            let title = document.createElement("h2");
            title.setAttribute("class", "shop-title");
            div.appendChild(title);

            let desc = document.createElement("p");
            desc.setAttribute("class", "shop-desc")
            div.appendChild(desc);

            imgArray.push(images.url);
            titleArray.push(images.title);
            descArray.push(images.description);
            descArray.push(images.size);
            descArray.push(images.price);

            div.innerHTML += `<h2>${images.title}</h2>`;
            div.innerHTML += `<img src=${images.url}>`;
        })


});
