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

setDefaultPage();


// user crud functionality

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userRef = db.collection("users");

let selectedUserID = "";
let selectedImgFile;

// ========== READ ==========
// watch the database ref for changes
userRef.onSnapshot(function(snapshotData) {
  let users = snapshotData.docs;
  appendUsers(users);
});

// append users to the DOM
function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    console.log(user.id);
    console.log(user.data().name);
    console.log(user.data().img);
    htmlTemplate += `
    <article>
      <h3>${user.data().name}</h3>
      <img src="${user.data().img}">
      <p><a href="mailto:${user.data().mail}">${user.data().mail}</a></p>
      <button onclick="deleteUser('${user.id}')">DELETE</button>
      <button onclick="selectUser('${user.id}', '${user.data().name}', '${user.data().mail}', '${user.data().img}')">UPDATE</button>
    </article>
    `;
  }
  document.querySelector('#user-container').innerHTML = htmlTemplate;
}

// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {
  // references to the input fields
  let nameInput = document.querySelector('#name');
  let mailInput = document.querySelector('#mail');
  let imgInput = document.querySelector('#imagePreview');
  console.log(nameInput.value);
  console.log(mailInput.value);
  console.log(imgInput.src);

  let newUser = {
    name: nameInput.value,
    mail: mailInput.value,
    img: imgInput.src
  };

  userRef.add(newUser);

  showPage("home");
}

// ========== UPDATE ==========

function selectUser(id, name, mail, img) {
  console.log(id);
  selectedUserID = id;
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  let imageInput = document.querySelector('#imagePreviewUpdate');
  nameInput.value = name;
  mailInput.value = mail;
  imageInput.src = img;
  showPage('edit');
}

function updateUser() {
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  let imageInput = document.querySelector('#imagePreviewUpdate');

  let userToUpdate = {
    name: nameInput.value,
    mail: mailInput.value,
    img: imageInput.src
  };
  userRef.doc(selectedUserID).set(userToUpdate);

  showPage("home");
}

// ========== DELETE ==========
function deleteUser(id) {
  userRef.doc(id).delete();
}

// ------ Prieview image function ------ //
function previewImage(file, previewId) {
  if (file) {
    selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = function(event) {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}