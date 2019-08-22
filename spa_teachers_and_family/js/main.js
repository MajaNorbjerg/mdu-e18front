"use strict";

// ---------- default SPA Web App setup ---------- //

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

// ---------- Fetch data from data sources ---------- //

/*
 Array of family members
*/
let familyMembers = [{
  name: "Peter Madsen",
  age: 52,
  harColor: "blonde",
  relation: "dad",
  img: "dad.jpg"
}, {
  name: "Ane Madsen",
  age: 51,
  harColor: "brown",
  relation: "mom",
  img: "ane.jpg"
}, {
  name: "Rasmus Madsen",
  age: 28,
  harColor: "blonde",
  relation: "brother",
  img: "IMG_0526_kvadrat.jpg"
}, {
  name: "Mie Madsen",
  age: 25,
  harColor: "brown",
  relation: "sister",
  img: "mie.jpg"
}, {
  name: "Mads Madsen",
  age: 18,
  harColor: "dark",
  relation: "brother",
  img: "mads.jpg"
}, {
  name: "Jens Madsen",
  age: 14,
  harColor: "blonde",
  relation: "uncle",
  img: "jenspeter.jpg"
}];

appendPersons(familyMembers);
/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  let htmlTemplate = "";
  for (let person of persons) {
    htmlTemplate += `
      <article>
        <img src="img/${person.img}">
        <h4>${person.name}</h4>
        <p>${person.age} years old</p>
        <p>Hair color: ${person.hairColor}</p>
        <p>Relation: ${person.relation}</p>
      </article>
    `;
  }
  document.querySelector("#my-family").innerHTML = htmlTemplate;
}

/*
Array of teachers
*/
let teachers = [{
    name: "Birgitte Kirk Iversen",
    initials: "bki",
    mail: "bki@baaa.dk",
    phone: "72286316",
    address: "Sønderhøj 30, 8260 Viby J",
    position: "Senior Lecturer",
    department: "Multimedia Design",
    img: "https://www.baaa.dk/CropUp/headshot/media/1524902/birgitte-kirk-iversen.jpg"
  }, {
    name: "Gertie Margrethe Kolding Jensen",
    initials: "gkj",
    mail: "gkj@baaa.dk",
    phone: "72286349",
    address: "Sønderhøj 30, 8260 Viby J",
    position: "Senior Lecturer",
    department: "Multimedia Design",
    img: "https://www.eaaa.dk/CropUp/headshot/media/2046228/Gertie-Kolding.jpg"
  }, {
    name: "Kim Elkjær Marcher-Jepsen",
    initials: "kije",
    mail: "kije@baaa.dk",
    phone: "7228 6325",
    address: "Sønderhøj 30, 8260 Viby J",
    position: "Lecturer",
    department: "Multimedia Design",
    img: "https://www.baaa.dk/CropUp/headshot/media/3124373/Kim-Elkjaer-Marcher-Jepsen.jpg"
  },
  {
    name: "Rasmus Cederdorff",
    initials: "race",
    mail: "race@baaa.dk",
    phone: "72286318",
    address: "Sønderhøj 30, 8260 Viby J",
    position: "Lecturer",
    department: "Multimediedesigner & Professionsbachelor i digital konceptudvikling",
    img: "http://eaaa.cederdorff.com/mdu-f18front/object_teachers_grid/img/race.jpg"
  }
];

appendTeachers(teachers);

function appendTeachers(teachers) {
  let htmlTemplate = "";
  for (let teacher of teachers) {
    console.log(teacher);
    htmlTemplate += `
    <article>
      <img src="${teacher.img}">
      <h3>${teacher.name}</h3>
      <p>${teacher.position} <br><a href="mailto:${teacher.mail}">${teacher.mail}</a></p>
    </article>
     `;
  }
  console.log(htmlTemplate);
  document.querySelector("#my-teachers").innerHTML = htmlTemplate;
}