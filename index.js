// function fires when the document is ready
$(function () {
  //console.log("ready");
});

// --------------fetch_data() function---------------------//
// This function fires when user clicks on use your location button
function fetch_data() {
  // check if browser supports location/GPS feature
  if (navigator.geolocation) {
    // browser support location feature
    /*
        The Geolocation.getCurrentPosition() method is used to get the current position of the device.
        navigator.geolocation.getCurrentPosition(success,error)
        - success
            A callback function that takes a GeolocationPosition object as its sole input parameter.
        - error
            An optional callback function that takes a GeolocationPositionError object as its sole input parameter.
    */
    let x = navigator.geolocation.getCurrentPosition(ongetPos, errors);
  } else {
    // browser doesn;t support location feature
    alert("Browser doesn't support location services!");
    console.log("geoloaction not active");
  }
}

// -----------handler function-----------//
/*
    When we get result of the loaction service, It has lots of data including co-ordinates of the device.
    This function is used as a callback and recieves location data.
    pos will contain loaction data
    then we are extracting co-ordinates of the device and sending that to openweathermap API to get weather details of that location
    then whatever response is coming from openweathermap API, that is sent to send_ouput funtion to print the response
*/
function ongetPos(pos) {
  // sending data to openwaethermap through AJAX
  $.ajax({
    type: "get",
    url:
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      pos.coords.latitude +
      "&lon=" +
      pos.coords.longitude +
      "&appid=6b30ae17ca20cafe9ddccdb52f660c55&units=metric",
    success: function (response) { // recioeveing response from openweathermap
      send_output(response); //setting response to sen_output function
    },
    // before sending the req to openwethermap, loading image is displyed
    beforeSend: function () {
      $("#output").html("<div class='col-12'><img src='./loading.gif'></div>");
    },
  });
}

// function to handle errors while accessing location data
// It is call back function to handle errors for Geolocation.getCurrentPosition()
function errors(err) {
  console.log("lnglreng");
  if (err.code == 0) {
    alert("Unknown Error!");
  } else if (err.code == 1) {
    alert("Permission Denied!");
  } else if (err.code == 2) {
    alert("Position Unavailable");
  } else if (err.code == 3) {
    alert("Timeout");
  }
}

/*
    This function recives the response,extract it and renders on to the html page in a tabular manner
    
*/
function send_output(response) {
  // console.log(response);
  var out = $("#output");
  var res = "<div class='col-md-12'>";
  res +=
    "<img src=http://openweathermap.org/img/wn/" +
    response.weather[0].icon +
    "@2x.png >";
  res += "<h2>" + response.main.temp + " C</h2>";
  res += "<h3>" + response.name + "," + response.sys.country + "</h3>";
  res += "<table width=100% class='table-striped bg-light pt-3'>";
  res +=
    "<tr><th>Feels Like</th><td>" + response.main.feels_like + "</td></tr>";
  res += "<tr><th>Humidity</th><td>" + response.main.humidity + "</td></tr>";
  res += "<tr><th>Pressure</th><td>" + response.main.pressure + "</td></tr>";
  res += "<tr><th>Sea Level</th><td>" + response.main.sea_level + "</td></tr>";
  res += "<tr><th>Max Temp</th><td>" + response.main.temp_max + "</td></tr>";
  res += "<tr><th>Min Temp</th><td>" + response.main.temp_min + "</td></tr>";
  res += "<tr><th>Visibility</th><td>" + response.visibility + "</td></tr>";
  res +=
    "<tr><th>Wind</th><td>" +
    response.wind.speed +
    " m/s at " +
    response.wind.deg +
    " degree</td></tr>";
  res += "</table>";
  res += "</div>";
  out.html(res);
}
