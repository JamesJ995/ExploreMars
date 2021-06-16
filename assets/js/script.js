var dropDownEl = document.querySelector("#roverSelect");
var radioBtnEl = document.querySelector("#buttonSelect");
var roverImageEl = document.querySelector("#rover_image");

var formSubmitHandler = function (event) {
  event.preventDefault();
};

var getRoverPhotos = function (rover, date, camera) {
  var rover = rover || "curiosity";
  var date = date || "2016-6-3";
  var camera = camera || "fhaz";
  console.log(rover);
  console.log(date);
  console.log(camera);
  var apiUrl =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
    rover +
    "/photos" +
    "?earth_date=" +
    date +
    "&camera=" +
    camera +
    "&api_key=ZoQFVDjeRVJElw1XyEu82ZMkIXeAWsIJ2HAE23Mq";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayPhotos(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to NASA");
    });
};

var displayPhotos = function (api) {
  if (api.length === 0) {
    return;
  }
  var roverImage = api.photos[0].img_src;

  roverImageEl.setAttribute("src", roverImage);
  console.log(roverImage);
};

var renderMarsWeather = function () {};

dropDownEl.addEventListener("submit", formSubmitHandler);
radioBtnEl.addEventListener("submit", formSubmitHandler);

getRoverPhotos();
$(document).ready(function () {
  $("select").formSelect();
});

var roverChoice = document.getElementById("roverMenu");

roverChoice.addEventListener("change", function (event) {
  var rover = event.target.value;
  console.log(rover);
  getRoverPhotos(rover);
});

$(document).ready(function () {
  $(".materialboxed").materialbox();
});

$(document).ready(function () {
  $(".datepicker").datepicker();
});
