var roverForm = document.querySelector("#roverMenu");
var dateForm = document.querySelector("#dateSelect");
var cameraForm = document.querySelector("#cameraSelect");
var roverImageEl = document.querySelector("#rover_image");
var roverChoice = "";
var cameraChoice = "";
var dateChoice = "";
var userRoverSpan = document.querySelector("#user-rover");
var userDateSpan = document.querySelector("#user-date");
var userCameraSpan = document.querySelector("#user-camera");
var submitButton = document.querySelector("#submitButton");
var msgDiv = document.querySelector("#msg");

function getInfo() {
  var rover = localStorage.getItem("roverMenu");
  var date = localStorage.getItem("dateSelect");
  var camera = localStorage.getItem("cameraSelect");

  if (!rover || !date || !camera) {
    return;
  }

  userRoverSpan.textContent = rover;
  userDateSpan.textContent = date;
  userCameraSpan.textContent = camera;

}

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//api fetch function
var getRoverPhotos = function () {
  var roverForm = localStorage.getItem("roverMenu");
  var dateForm = localStorage.getItem("dateSelect");
  var cameraForm = localStorage.getItem("cameraSelect");

  if (!roverForm || !dateForm || !cameraForm) {
    return;
  }

  userRoverSpan.textContent = roverChoice;
  userDateSpan.textContent = dateChoice;
  userCameraSpan.textContent = cameraChoice;

  var apiUrl =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
    roverChoice +
    "/photos" +
    "?earth_date=" +
    dateChoice +
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

submitButton.addEventListener("click", function(event) {
  console.log('SUBMITTED', event);
  event.preventDefault();

  var rover = document.querySelector("#roverMenu").value;
  var date = document.querySelector("#dateSelect").value;
  var camera = document.querySelector('#cameraSelect').value;

  if (rover === "") {
    displayMessage("error", "Rover cannot be blank");
  } else if (date === "") {
    displayMessage("error", "Date cannot be blank");
  } else if (camera === "") {
    displayMessage("error", "Camera must be selected");
  } else {
    displayMessage("success", "Selection successfully");

    localStorage.setItem("roverMenu", rover);
    localStorage.setItem("dateSelect", date);
    localStorage.setItem("cameraSelect", camera);
    // getRoverPhotos();
  }
});