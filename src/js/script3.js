
    $(document).ready(function(){
    var lat;
    var lng;
    var latitude =42.34189848834187;
    var longitude =-83.06009130642892;
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





function processPosition(position) {
  //console.log(position);
  if (position.gps_lat){
    lat = convertToDegrees(position.gps_lat);
    latitude = lat;
    //checkLocation(lat, lng);
  }
  if (position.gps_long){
    lng = convertToDegrees(position.gps_long);
    longitude=lng;
    //checkLocation(lat, lng);
  }


//console.log(lat);
//console.log(lng);
  
  var latText = document.getElementById('gpslat');
  var lngText = document.getElementById('gpslng');

  latText.innerHTML = lat;
  lngText.innerHTML = lng;
  
  
  var locText = document.getElementById('location');


/*
  if (checkLocation(lat, lng)) {
    locText.innerHTML = 'Welcome to Detroit';
  }
  else {
    locText.innerHTML = 'Traveling';
  }
*/

}

function convertToDegrees(milliarc){
  return milliarc / 60 / 60 / 1000;
}




  
  //Detroit lng: -299170000
  //Detroit lat: 152602039

gm.info.watchVehicleData(processPosition, ['gps_lat', 'gps_long']);
gm.info.getVehicleData(processPosition, ['gps_lat', 'gps_long']);
checkLocation();
function checkLocation(){

$.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true',function(data){
  //if (lat !== undefined && lng !== undefined){
  var in_data = 0;
  console.log(latitude);
  console.log(longitude);
  city = data.results[0].address_components[3].long_name;
  // console.log(data); // for debugging
  for (i = 0; i < city_array.length; i++) {
    var temp = city_array[i];
    //document.write(temp[0]); // for debugging
    if (temp[0] == city) {
      city_info = temp;
      in_data = 1;
      //document.write(city_info); // for debugging
      break;
    }
  }
  if (in_data == 1) {
    console.log(city_info); // for debugging
    document.write("city: ".concat(city_info[0]));
    document.write("population: ".concat(city_info[1]));
    document.write("Nickname: ".concat(city_info[2]));
    //alert( "Load was performed");
  } else {
   $(".result").html("Travelling");
    $(".result2").html("");
    $(".result3").html("");
  }
 // } else {
  //  $(".result").html("Travelling");
    //$(".result2").html("");
    //$(".result3").html("");
  //}
})

}










  })
    