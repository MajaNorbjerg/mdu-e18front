"use strict";

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
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}


function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

// ========== Firebase sign in functionality ========== //

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMyBxTqrwDePj6kSVgD5rVsEQ-66FCoCk",
  authDomain: "mdu-e18front.firebaseapp.com",
  databaseURL: "https://mdu-e18front.firebaseio.com",
  projectId: "mdu-e18front",
  storageBucket: "mdu-e18front.appspot.com",
  messagingSenderId: "1065294705229",
  appId: "1:1065294705229:web:81f00c89d44d800c75e204"
};
// Initialize Firebase and database references
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const movieRef = db.collection("movies");
const userRef = db.collection("users");
let currentUser;

// Firebase UI configuration
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '#home'
};

// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
  let tabbar = document.querySelector('#tabbar');
  currentUser = user;
  console.log(currentUser);
  if (user) { // if user exists and is authenticated
    setDefaultPage();
    tabbar.classList.remove("hide");
    appendUserData();
    initMovieRef();
  } else { // if user is not logged in
    showPage("login");
    tabbar.classList.add("hide");
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  showLoader(false);
});

// sign out user
function logout() {
  firebase.auth().signOut();
  // reset input fields
  document.querySelector('#name').value = "";
  document.querySelector('#mail').value = "";
  document.querySelector('#birthdate').value = "";
  document.querySelector('#hairColor').value = "";
  document.querySelector('#imagePreview').src = "";
}

// append user data to profile page
function appendUserData() {
  // auth user
  document.querySelector('#name').value = currentUser.displayName;
  document.querySelector('#mail').value = currentUser.email;

  // database user
  userRef.doc(currentUser.uid).get().then(function(doc) {
    let userData = doc.data();
    console.log(userData);
    if (userData) {
      document.querySelector('#birthdate').value = userData.birthdate;
      document.querySelector('#hairColor').value = userData.hairColor;
      document.querySelector('#imagePreview').src = userData.img;
    }
  });
}

// update user data - auth user and database object
function updateUser() {
  let user = firebase.auth().currentUser;

  // update auth user
  user.updateProfile({
    displayName: document.querySelector('#name').value
  });

  // update database user
  userRef.doc(currentUser.uid).set({
    img: document.querySelector('#imagePreview').src,
    birthdate: document.querySelector('#birthdate').value,
    hairColor: document.querySelector('#hairColor').value
  }, {
    merge: true
  });
}

// ========== Prieview image function ========== //
function previewImage(file, previewId) {
  if (file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// ========== Movie functionality ========== //

// initialize movie references - all movies and user's favourite movies
function initMovieRef() {
  // all movies
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    appendMovies(movies);
  });

  // user's favourite movies
  userRef.doc(currentUser.uid).onSnapshot({
    includeMetadataChanges: true
  }, function(doc) {
    if (!doc.metadata.hasPendingWrites && doc.data()) {
      appendFavMovies(doc.data().favMovies);
    }
  });
}

// append movies to the DOM
function appendMovies(movies) {
  let htmlTemplate = "";

  for (let movie of movies) {
    htmlTemplate += `
      <article>
        <h2>${movie.data().title} (${movie.data().year})</h2>
        <img src="${movie.data().img}">
        <p>${movie.data().description}</p>
        <button onclick="addToFavourites('${movie.id}')">Add to favourites</button
      </article>
    `;
  }

  document.querySelector('#movie-container').innerHTML = htmlTemplate;
}

// append favourite movies to the DOM
function appendFavMovies(favMovieIds) {
  document.querySelector('#fav-movie-container').innerHTML = "";
  for (let movieId of favMovieIds) {
    movieRef.doc(movieId).get().then(function(movie) {
      document.querySelector('#fav-movie-container').innerHTML += `
        <article>
          <h2>${movie.data().title} (${movie.data().year})</h2>
          <img src="${movie.data().img}">
          <p>${movie.data().description}</p>
          <button onclick="removeFromFavourites('${movie.id}')">Remove from favourites</button
        </article>
      `;
    });

  }
}

// adds a given movieId to the favMovies array inside currentUser
function addToFavourites(movieId) {
  userRef.doc(currentUser.uid).set({
    favMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
  }, {
    merge: true
  });
}

// removes a given movieId to the favMovies array inside currentUser
function removeFromFavourites(movieId) {
  userRef.doc(currentUser.uid).update({
    favMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
  });
}