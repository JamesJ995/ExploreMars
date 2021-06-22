var roverForm = document.querySelector("#roverMenu");
var dateForm = document.querySelector("#dateSelect");
var cameraForm = document.querySelector("#cameraSelect");
var roverImageEl = document.querySelector("#rover_image");
var weatherImageEl = document.querySelector("#weather_data");
var description = document.querySelector("#desc");
var cameraChoiceName= "";
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
var recentBtn = document.querySelector("#recentSearch");

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//api fetch function
var getRoverPhotos = function () {
  // var date = date || "2013-2-20";
  // var rover = localStorage.getItem("roverMenu");
  // var date = localStorage.getItem("dateSelect");
  // var camera = localStorage.getItem("cameraSelect");

  // if (!rover || !date || !camera) {
  //   return;
  // }

  userRoverSpan.textContent = roverChoice;
  userDate.textContent = dateChoice;
  userDateSpan.textContent = dateChoice;
  weatherDate.textContent = moment().format("YYYY-MM-DD");
  userCameraSpan.textContent = cameraChoiceName;

  //var date = date || dateChoice;
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

var getWeatherData = function (date) {
  var apiWeatherUrl =
    "https://api.nasa.gov/planetary/apod?api_key=ZoQFVDjeRVJElw1XyEu82ZMkIXeAWsIJ2HAE23Mq";

  fetch(apiWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        //alert("Error: " + response.statusText);
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

roverForm.addEventListener("change", function (event) {
  localStorage.setItem("roverSelectOld", roverChoice);
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
  localStorage.setItem("roverMenu", roverChoice);
});

cameraForm.addEventListener("change", function (event) {
  localStorage.setItem("cameraSelectOld", cameraChoice);

  cameraChoiceName = event.target.value;
  cameraChoice = event.target.id;
  localStorage.setItem("cameraSelect", cameraChoice);
});

dateForm.addEventListener("change", function (event) {
  localStorage.setItem("dateSelectOld", dateChoice);
  dateChoice = event.target.value;
  dateChoice = moment(dateChoice, "MMM DD, YYYY").format("YYYY-MM-DD");
  dateChoice = localStorage.setItem("dateSelect", dateChoice);
});

//materialize code to enable features
$(document).ready(function () {
  $(".materialboxed").materialbox();
});

//enable materialize datepicker and change its custom options
document.addEventListener("DOMContentLoaded", function () {
  var options = {
    defaultDate: new Date(2016, 1, 3),
    setDefaultDate: true,
    minDate: new Date(2008, 1, 1),
    maxDate: new Date(2020, 9, 15),
    yearRange: 5,
  };
  var elems = document.querySelector(".datepicker");
  var instance = M.Datepicker.init(elems, options);
  // instance.open();
  instance.setDate(new Date(2018, 2, 8));
});

//enable materialize select form
$(document).ready(function () {
  $("select").formSelect();
});

//enable materialize parallax image feature
$(document).ready(function () {
  $(".parallax").parallax();
});

var initLocalStorage = function () {
  roverChoice = localStorage.getItem("roverMenu");
  dateChoice = localStorage.getItem("dateSelect");
  cameraChoice = localStorage.getItem("cameraSelect");
  getRoverPhotos();
  getWeatherData();
};

//on submit button click check for values and save to localStorage
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var rover = roverForm.value;
  var date = dateForm.value;
  var camera = cameraForm.value;

  if (rover === "") {
    displayMessage("error", "Rover must be selected");
    return;
  } else if (date === "") {
    displayMessage("error", "Date must be selected");
    return;
  } else if (camera === "") {
    displayMessage("error", "Camera must be selected");
    return;
  } else {
    displayMessage("success", "");

    getRoverPhotos();
    getWeatherData();
  }
});

recentBtn.addEventListener("click", function () {
  roverChoice = localStorage.getItem("roverSelectOld");
  dateChoice = localStorage.getItem("dateSelectOld");
  cameraChoice = localStorage.getItem("cameraSelectOld");
  getRoverPhotos();
});

initLocalStorage();
