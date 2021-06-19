var roverForm = document.querySelector("#roverMenu");
var dateForm = document.querySelector("#dateSelect");
var cameraForm = document.querySelector("#cameraSelect");
var roverImageEl = document.querySelector("#rover_image");
var weatherImageEl = document.querySelector("#weather_data");
var description = document.querySelector("#desc");
var roverChoice = "";
var cameraChoiceId = "";
var cameraChoice = "";
var dateChoice = "";
var userRoverSpan = document.querySelector("#user-rover");
var userDate = document.querySelector("#user-date");
var userDateSpan = document.querySelector("#user-date-span");
var weatherDate = document.querySelector("#weather-date");
var userCameraSpan = document.querySelector("#user-camera");
var submitButton = document.querySelector("#submitButton");
var msgDiv = document.querySelector("#msg");


function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//api fetch function
var getRoverPhotos = function () {
  //var date = date || "2013-2-20";
  var rover = localStorage.getItem("roverMenu");
  var date = localStorage.getItem("dateSelect");
  var camera = localStorage.getItem("cameraSelect");

  if (!rover || !date || !camera) {
    return;
  }

  userRoverSpan.textContent = roverChoice;
  userDate.textContent = dateChoice;
  userDateSpan.textContent = dateChoice;
  weatherDate.textContent = dateChoice;
  userCameraSpan.textContent = cameraChoice;

  var date = date || dateChoice;
  var apiUrl =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
    roverChoice +
    "/photos" +
    "?earth_date=" +
    dateChoice +
    "&camera=" +
    cameraChoiceId +
    "&api_key=ZoQFVDjeRVJElw1XyEu82ZMkIXeAWsIJ2HAE23Mq";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayPhotos(data);
        });
      } else {
        alert("Error: " + response.statusText);
        console.log(alert);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to NASA");
    });
};

var getWeatherData = function (date) {
  var apiWeatherUrl =
    "https://api.nasa.gov/planetary/apod?api_key=ZoQFVDjeRVJElw1XyEu82ZMkIXeAWsIJ2HAE23Mq";

  fetch(apiWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
          console.log(data);
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
};

//renders the weather data found from getMarsWeather
var displayWeather = function (api) {
  if (api.length === 0) {
    return;
  }
  var weatherImage = api.url;

  weatherImageEl.setAttribute("src", weatherImage);
  description.textContent = api.explanation;
};

//event listener for submit button under the user input
$("#submitButton").click(function () {
  getRoverPhotos();
  getWeatherData();
});

roverForm.addEventListener("change", function (event) {
  roverChoice = event.target.value;
  if (roverChoice == 1) {
    roverChoice = "Curiosity";
  }
  if (roverChoice == 2) {
    roverChoice = "Opportunity";
  }
  if (roverChoice == 3) {
    roverChoice = "Spirit";
  }
});

cameraForm.addEventListener("change", function (event) {
  cameraChoiceId = event.target.id;
  cameraChoice = event.target.value;
});

dateForm.addEventListener("change", function (event) {
  dateChoice = event.target.value;
  dateChoice = moment(dateChoice, "MMM DD, YYYY").format("YYYY-MM-DD");
  console.log('Formatted Date Choice:', dateChoice);
});

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

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var rover = roverForm.value;
  var date = dateForm.value;
  var camera = cameraForm.value;


  if (rover === "") {
    displayMessage("error", "Rover must be selected");
  } else if (date === "") {
    displayMessage("error", "Date must be selected");
  } else if (camera === "") {
    displayMessage("error", "Camera must be selected");
  } else {
    displayMessage("success", "");

    localStorage.setItem("roverMenu", rover);
    localStorage.setItem("dateSelect", date);
    localStorage.setItem("cameraSelect", camera);
    // getRoverPhotos();
  }
});