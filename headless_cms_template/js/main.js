"use strict";

const url = "http://api.cederdorff.com/wp-json/wp/v2/posts";
// const url = "http://api.cederdorff.com/wp-json/wp/v2/posts?_embed";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(posts) {
    console.log(posts);
  });

function appendPosts(posts) {
  // to do
}

// get the featured image url
// function getFeaturedImageUrl(post) {
//   let imageUrl = "";
//   if (post._embedded['wp:featuredmedia']) {
//     imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
//   }
//   return imageUrl;
// }