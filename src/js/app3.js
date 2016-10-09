$(document).ready(function(){

//code referenced from: http://stackoverflow.com/questions/6548504/how-can-i-get-city-name-from-a-latitude-and-longitude-point
var lat;
var lng;
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
                    ["Kalamazoo", 75548, "The Bedding Plant Capital of the World"]];
$.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true',function(data){
    $( ".result" ).html( data );
    alert( "Load was performed." );

})
   
   
    
    function displayLocation(latitude,longitude){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        console.log(address.address_components[3].long_name); // for debugging
        document.write(address.address_components[3].long_name); // for debugging
        city = address.address_components[3].long_name;
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
        document.write("city: ", city_info[0]);
        document.write("\n");
        document.write("population: ", city_info[1]);
        document.write("\n");
        document.write("Nickname: ", city_info[2]);
        }
    };
    request.send();
    };

    var successCallback = function(position){
    //var x = position.coords.latitude;
    //var y = position.coords.longitude;
    //document.write(x);
    //document.write(y);
    displayLocation(42.34189848834187,-83.06009130642892);
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

gm.info.getVehicleData(processPosition, ['gps_lat', 'gps_long']);
gm.info.watchVehicleData(processPosition, ['gps_lat', 'gps_long']);

})
