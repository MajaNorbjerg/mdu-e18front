"use strict";

let tabs = document.querySelector('#tabs');
let instance = M.Tabs.init(tabs);

let elems = document.querySelectorAll('select');
let instances = M.FormSelect.init(elems);

// =========== Movie SPA functionality =========== //

// let movies = [];
//
// // fetch all movies from WP
// function getMovies() {
//   fetch('http://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(json) {
//       console.log(json);
//       appendMovies(json);
//       movies = json;
//     });
// }
//
// getMovies();
//
// // append movies to the DOM
// function appendMovies(movies) {
//   let htmlTemplate = "";
//
//   for (let movie of movies) {
//     htmlTemplate += `
//       <article>
//         <h2>${movie.title.rendered} (${movie.acf.year})</h2>
//         <img src="${movie.acf.img}">
//         <p>${movie.acf.description}</p>
//         <iframe src="${movie.acf.trailer}"></iframe>
//       </article>
//     `;
//   }
//
//   document.querySelector('#movies-container').innerHTML = htmlTemplate;
// }
//
// // search functionality
// function search(value) {
//   let searchQuery = value.toLowerCase();
//   let filteredMovies = [];
//   for (let movie of movies) {
//     let title = movie.title.rendered.toLowerCase();
//     if (title.includes(searchQuery)) {
//       filteredMovies.push(movie);
//     }
//   }
//   console.log(filteredMovies);
//   appendMovies(filteredMovies);
// }
//
// // fetch all genres / categories from WP
// function getGenres() {
//   fetch('http://movie-api.cederdorff.com/wp-json/wp/v2/categories')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(categories) {
//       console.log(categories);
//       appendGenres(categories);
//     });
// }
//
// getGenres();
//
// // append all genres as select options (dropdown)
// function appendGenres(genres) {
//   let htmlTemplate = "";
//   for (let genre of genres) {
//     htmlTemplate += `
//       <option value="${genre.id}">${genre.name}</option>
//     `;
//   }
//
//   document.querySelector('#select-genre').innerHTML += htmlTemplate;
// }
//
// // genre selected event - fetch movies by selected category
// function genreSelected(genreId) {
//   console.log(genreId);
//   fetch(`http://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=${genreId}`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(movies) {
//       console.log(movies);
//       appendMoviesByGenre(movies);
//     });
// }
//
// // append movies by genre
// function appendMoviesByGenre(moviesByGenre) {
//   let htmlTemplate = "";
//
//   for (let movie of moviesByGenre) {
//     htmlTemplate += `
//       <article>
//         <h2>${movie.title.rendered} (${movie.acf.year})</h2>
//         <img src="${movie.acf.img}">
//         <p>${movie.acf.description}</p>
//         <iframe src="${movie.acf.trailer}"></iframe>
//       </article>
//     `;
//   }
//
//   // if no movies, display feedback to the user
//   if (moviesByGenre.length === 0) {
//     htmlTemplate = `
//       <p>No Movies</p>
//     `;
//   }
//
//   document.querySelector('#movies-by-genre-container').innerHTML = htmlTemplate;
// }