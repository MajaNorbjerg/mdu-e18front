"use strict";

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10
  });

  // set position by device geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(pos);
  });

  // load places from json file
  fetch('json/data.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      appendMarkers(json);
    });
}

function appendMarkers(places) {
  for (let place of places) {
    console.log(place);
    let latLng = new google.maps.LatLng(place.lat, place.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}