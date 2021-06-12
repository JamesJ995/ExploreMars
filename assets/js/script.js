var dropDownEl = document.querySelector(".rover_select");
var radioBtnEl = document.querySelector("#buttonSelect");

var formSubmitHandler = function (event) {
  event.preventDefault();
};

var getRoverPhotos = function (rover, date, camera) {
    var rover = 'curiosity';
    var date = '2015-6-3'
    var camera = 'fhaz';
    var apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos' + "?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    //example url https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayPhotos(data, rover, date, camera);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to NASA');
    });
    console.log(apiUrl);
};

var displayPhotos = function (api, rover, date, camera) {

}

var renderMarsWeather = function () {};

dropDownEl.addEventListener("submit", formSubmitHandler);
radioBtnEl.addEventListener("submit", formSubmitHandler);

getRoverPhotos();