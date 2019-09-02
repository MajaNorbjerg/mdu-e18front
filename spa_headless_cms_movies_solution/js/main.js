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
  let page = "movies";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

// =========== Movie SPA functionality =========== //

let movies = [];

// fetch all movies from WP
function getMovies() {
  fetch('http://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed')
    .then(function(response) {
      return response.json();
    })
    .then(function(movies) {
      console.log(movies);
      appendMovies(movies);
    });
}

getMovies();

// append movies to the DOM
function appendMovies(movies) {
  let htmlTemplate = "";

  for (let movie of movies) {
    htmlTemplate += `
      <article>
        <h2>${movie.title.rendered} (${movie.acf.year})</h2>
        <img src="${movie.acf.img}">
        <p>${movie.acf.description}</p>
        <a href="${movie.acf.trailer}" target="_blank">Trailer</a>
      </article>
    `;
  }

  document.querySelector('#movies-container').innerHTML = htmlTemplate;
}

// search functionality
function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredMovies = [];
  for (let movie of movies) {
    let title = movie.title.rendered.toLowerCase();
    if (title.includes(searchQuery)) {
      filteredMovies.push(product);
    }
  }
  console.log(filteredMovies);
  appendMovies(filteredMovies);
}

// fetch all genres / categories from WP
function getGenres() {
  // TODO:
}

// append all genres as select options (dropdown)
function appendGenres(genres) {
  // TODO:
}

// genre selected event
function genreSelected(genreId) {
  console.log(genreId);
  // TODO: fetch and append by genre
}