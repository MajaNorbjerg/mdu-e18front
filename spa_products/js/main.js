"use strict";

// =========== Single Page Application functionality =========== //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "products";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

// =========== Product functionality =========== //

let products = [{
  model: 'MacBook Pro 13"',
  brand: 'Apple',
  price: '11799',
  img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1529520060550'
}, {
  model: 'MacBook Pro 15"',
  brand: 'Apple',
  price: '21499',
  img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp15touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1529520056969'
}, {
  model: 'Zenbook 14"',
  brand: 'ASUS',
  price: '8099',
  img: 'https://media.power.dk/images/h-7f45c2a55ddb117ac5356153c12b4e3b/products/951450/951450_1_900x900_w_g.jpg'
}];

function appendProducts(products) {
  let htmlTemplate = "";
  for (let product of products) {
    console.log(product);
    htmlTemplate += `
      <article>
        <img src="${product.img}">
        <h2>${product.model}</h2>
        <h3>${product.brand}</h3>
        <p>Price: ${product.price} kr.</p>
      </article>
    `;

  }
  document.querySelector('#products-container').innerHTML = htmlTemplate;
}

appendProducts(products);

function addNewProduct() {
  let brand = document.querySelector('#brand').value;
  let model = document.querySelector('#model').value;
  let price = document.querySelector('#price').value;
  let img = document.querySelector('#img').value;

  products.push({
    brand,
    model,
    price,
    img
  });

  console.log(products);
  appendProducts(products);
  showPage('products');
}

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let product of products) {
    let model = product.model.toLowerCase();
    let brand = product.brand.toLowerCase();
    if (model.includes(searchQuery) || brand.includes(searchQuery)) {
      filteredProducts.push(product);
    }
  }
  console.log(filteredProducts);
  appendProducts(filteredProducts);
}