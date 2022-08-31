const ApiKey = "fb055ee467948a0ae310d972f9ad2794"
let city;
let lat;
let lon;

//this is getting the button with the id of button from the html and assigning it to variable named button
var button = document.getElementById("button")

button.addEventListener("click", function(){
    getLL()
});
//get the lat and long of city before using open weather
function getLL() {
city = document.getElementById("input").value;
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
.then( function(data){
  //var data = await response.json()
  console.log(data)
return data.json()
  //var {longitude, latitude} = data.data[0]
  //  lat = response.coord.lat;
  //  lon = response.coord.lon;
  //var {longitude, latitude} = data.data[0]
  //console.log(longitude, latitude);
})
.then (function (data) {
console.log(data)
lat = data.coord.lat;
lon = data.coord.lon;
getApi(lat, lon);
})
}
//this will get the weather forecast:
async function getApi(lat, lon) {
  let myObject = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
  let weatherData = await myObject.json()
  console.log(weatherData)
} 