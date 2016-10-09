// Your code goes here

/*
var vinElem = document.getElementById('vin');
gm.info.getVehicleConfiguration(function(data) {
  vinElem.innerHTML = gm.info.getVIN();
})
*/

var lat;
var lng;

//code referenced from: http://stackoverflow.com/questions/6548504/how-can-i-get-city-name-from-a-latitude-and-longitude-point
var city;
var city_info;
var city_array = [["Detroit", 688701, "Motor City"],
                    ["Sterling Heights", 131224, "a city"],
                    ["Grand Rapids", 192294, "Furniture City"],
                    ["Warren", 134873, "a city"],
                    ["Ann Arbor", 117025, "Tree Town"],
                    ["Lansing", 113972, "a city"],
                    ["Flint", 99763, "The Birthplace of General Motors"],
                    ["Dearborn", 95884, "a city"],
                    ["Livonia", 95208, "a city"],
                    ["Kalamazoo", 75548, "The Bedding Plant Capital of the World"]]

function displayLocation(latitude,longitude){
   var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    console.log(url);
    
    var async = true;

    request.open(method, url, async);

    
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        console.log(address);
        
        // document.write(address.address_components[3].long_name); // for debugging
        /*city = address.address_components[3].long_name;
        for (i = 0; i < city_array.length; i++) {
            var temp = city_array[i];
            //document.write(temp[0]); // for debugging
            if (temp[0] == city) {
            city_info = temp;
            //document.write(city_info); // for debugging
            break;
            }
        }
        // document.write(city_info); // for debugging
        console.log("city: ", city_info[0]);
        console.log("\n");
        console.log("population: ", city_info[1]);
        console.log("\n");
        console.log("Nickname: ", city_info[2]);
        */}
    };
    request.send();
    
    };

var successCallback = function(position){
    var x = lat;
    var y = lng;
    displayLocation(x,y);
    };

    var errorCallback = function(error){
    var errorMessage = 'Unknown error';
    switch(error.code) {
        case 1:
        errorMessage = 'Permission denied';
        break;
        case 2:
        errorMessage = 'Position unavailable';
        break;
        case 3:
        errorMessage = 'Timeout';
        break;
    }
    document.write(errorMessage);
    };

    var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
    };

//navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
successCallback();

function showSpeed(data) {
  console.log(data);
  var speed = data.average_speed;
  if (speed !== undefined) {
    var speedText = document.getElementById('speed');
    speedText.innerHTML = speed;
  }
}

function showUnits(data) {
  console.log(data);
  var units = data.road_speedlimit_units;
  if (units !== undefined) {
    var unitText = document.getElementById('units');
    unitText.innerHTML = units;
  }
}

function showSeatbeltStatus(data) {
  console.log(data);
  var seatbeltStatus = data.driver_seatbelt_fastened;
  if (seatbeltStatus == 1) {
    seatbeltStatus = 'Seatbelt Fastened';
  }
  else
    seatbeltStatus = 'WARNING: Seatbelt Unbuckled!';

  if (seatbeltStatus !== undefined){
    var seatbeltText = document.getElementById('seatbelt');
    seatbeltText.innerHTML = seatbeltStatus;
  }
}

function processPosition(position) {
  console.log(position);
  if (position.gps_lat){
    lat = convertToDegrees(position.gps_lat);
  }
  if (position.gps_long){
    lng = convertToDegrees(position.gps_long);
  }



  
  var latText = document.getElementById('gpslat');
  var lngText = document.getElementById('gpslng');

  latText.innerHTML = lat;
  lngText.innerHTML = lng;
  
  
  var locText = document.getElementById('location');

  if (checkLocation(lat, lng)) {
    locText.innerHTML = 'Welcome to Detroit';
  }
  else {
    locText.innerHTML = 'Traveling';
  }
}

function convertToDegrees(milliarc){
  return milliarc / 60 / 60 / 1000;
}


function checkLocation(lat, lng){
  // creates a 20 mile grid around the target coordinates
  var latS = 42.383037 - .15;
  var latN = 42.383037 + .15;
  var lngW = -83.102237 - .15;
  var lngE = -83.102237 + .15;
  
  //Detroit lng: -299170000
  //Detroit lat: 152602039

  if ((lat > latS) && (lat < latN) && (lng > lngW) && (lng < lngE)) {
    return true;
  }
  else 
    return false;
}



gm.info.watchVehicleData(showSpeed, ['average_speed']);
gm.info.getVehicleData(showSpeed, ['average_speed']);

gm.info.watchVehicleData(processPosition, ['gps_lat', 'gps_long']);
gm.info.getVehicleData(processPosition, ['gps_lat', 'gps_long']);




