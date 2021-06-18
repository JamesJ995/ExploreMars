var roverForm = document.querySelector("#roverMenu");
var dateForm = document.querySelector("#dateSelect");
var cameraForm = document.querySelector("#cameraSelect");
var roverImageEl = document.querySelector("#rover_image");
var roverChoice = "";
var cameraChoice = "";
var dateChoice = "";

//api fetch function
var getRoverPhotos = function () {
  var date = date || "2016-6-3";
  var apiUrl =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
    roverChoice +
    "/photos" +
    "?earth_date=" +
    date +
    "&camera=" +
    cameraChoice +
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

//renders the photo found with getRoverImage()
var displayPhotos = function (api) {
  if (api.length === 0) {
    return;
  }
  var roverImage = api.photos[0].img_src;

  roverImageEl.setAttribute("src", roverImage);
  console.log(roverImage);
};

//renders the weather data found from getMarsWeather
var renderMarsWeather = function () {};

//event listener for submit button under the user input
$('#submitButton').click(function() {
  getRoverPhotos();
})

roverForm.addEventListener("change", function (event) {
  roverChoice = event.target.value;
  if(roverChoice == 1){
    roverChoice = "Curiosity"
  }
  if(roverChoice == 2){
    roverChoice = "Opportunity"
  }
  if(roverChoice == 3){
    roverChoice = "Spirit"
  }
});

cameraForm.addEventListener("change", function(event){
  cameraChoice = event.target.id;
})

dateForm.addEventListener("change", function(event) {
  dateChoice = event.target.value;
  console.log(dateChoice);
})

//materialize code to enable features
$(document).ready(function () {
  $(".materialboxed").materialbox();
});

$(document).ready(function () {
  $(".datepicker").datepicker();
});

$(document).ready(function () {
  $("select").formSelect();
});
