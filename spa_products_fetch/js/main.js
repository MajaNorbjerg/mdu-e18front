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

let products = [];

fetch('json/products.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    products = json;
    appendProducts(products);
  });

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