"use strict";

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

console.log(teachers);
appendTeachers(teachers);

// Appending objects to the DOM
function appendTeachers(teachers) {
  for (let teacher of teachers) {
    console.log(teacher);
    document.querySelector("#grid-teachers").innerHTML +=
      "<article>" +
      "<img src='" + teacher.img + "'>" +
      "<h3>" + teacher.name + "</h3>" +
      teacher.position + "<br>" +
      "<a href='mailto:" + teacher.mail + "'>" + teacher.mail + "</a>" +
      "</article>";
  }
}