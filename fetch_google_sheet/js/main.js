"use strict";

let sheetId = "1YDZYCLqv3FwwXCXIxVqmx7kwPtZvhgBb_V-HUg8U7IA";
let sheetNumber = 1;
let sheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetNumber}/public/full?alt=json`;
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendPersons(json.feed.entry);
  });

/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  console.log(persons);
  let htmlTemplate = "";
  for (let person of persons) {
    htmlTemplate += `
        <article>
          <img src="${person['gsx$img']['$t']}">
          <h4>${person['gsx$name']['$t']}</h4>
          <p><a href="mailto:${person['gsx$email']['$t']}">${person['gsx$email']['$t']}</a></p>
        </article>
      `;
  }
  document.querySelector("#persons").innerHTML += htmlTemplate;
}