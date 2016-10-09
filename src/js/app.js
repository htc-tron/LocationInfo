// Your code goes here

/*
var vinElem = document.getElementById('vin');
gm.info.getVehicleConfiguration(function(data) {
  vinElem.innerHTML = gm.info.getVIN();
})
*/

var lat;
var lng;

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

//gm.info.watchVehicleData(showUnits, ['road_speedlimit_units']);
//gm.info.getVehicleData(showUnits, ['road_speedlimit_units']);

//gm.info.watchVehicleData(showSeatbeltStatus, ['driver_seatbelt_fastened']);
//gm.info.getVehicleData(showSeatbeltStatus, ['driver_seatbelt_fastened']);

gm.info.watchVehicleData(processPosition, ['gps_lat', 'gps_long']);
gm.info.getVehicleData(processPosition, ['gps_lat', 'gps_long']);



//gm.info.watchPosition(processPosition, true);
//gm.info.getCurrentPosition(processPosition, true);


