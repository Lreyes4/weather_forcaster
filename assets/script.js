const ApiKey = "5962ba4bf00030115c5c6bf02a21e266"
let city;
let lat;
let lon;
const currentTempEl = document.querySelector(".currentTemp");
const currentHumidityEl = document.querySelector(".currentHumidity");
const currentWindEl = document.querySelector(".currentWindSpeed");
const currentUVIEl = document.querySelector(".currentUVI");
const currentIconEl = document.querySelector(".currentIcon");
const currentDayEl = document.querySelector(".currentDay");


const futureTempEls = document.querySelectorAll(".futureTemp");
const futureArray = 

for (let i = 0; i < futureArray.length; i++) {
  futureTempEls[i].textContent = futureArray[i].temp;
  
}



//this is getting the button with the id of button from the html and assigning it to variable named button
var button = document.getElementById("button")

button.addEventListener("click", function () {
  getLL()
});
//get the lat and long of city before using open weather
function getLL() {
  city = document.getElementById("input").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${ApiKey}`)
    .then(function (data) {
      //var data = await response.json()
      return data.json()
      //var {longitude, latitude} = data.data[0]
      //  lat = response.coord.lat;
      //  lon = response.coord.lon;
      //var {longitude, latitude} = data.data[0]
      //console.log(longitude, latitude);
    })
    .then(function (data) {
      console.log(data)
      lat = data.coord.lat;
      lon = data.coord.lon;
      getApi(lat, lon);
    })
}
//this will get the weather forecast:
//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
function getApi(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`)
    .then(function (data) {
      return data.json()

    })
    .then(function (data) {
      console.log(data.daily.slice(1, 6));
      console.log(data.current);
      let currentDt = data.current.dt
      let currentWind = data.current.wind_speed;
      let currentTemp = data.current.temp;
      let currentHumidity = data.current.humidity;
      let currentIcon = data.current.weather[0].icon;
      let currentURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
      let currentUVIndex = data.current.uvi;
      console.log(currentWind, currentTemp, currentHumidity, currentURL, currentUVIndex)
      currentHumidityEl.textContent = currentHumidity + " %"
      currentDayEl.textContent = currentDt
      currentTempEl.textContent = currentTemp + " F"
      currentWindEl.textContent = currentWind + " mph"
      currentUVIEl.textContent = currentUVIndex + " uvi"
      currentIconEl.setAttribute("src", currentURL)

      //future weather days  
      let futureDt = data.future.dt
      let futureWind = data.future.wind_speed;
      let futureTemp = data.future.temp;
      let futureHumidity = data.future.humidity;
      let futureIcon = data.future.weather[0].icon;
      let futureURL = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`
      let futureUVIndex = data.future.uvi;
      console.log(futureWind, futureTemp, futureHumidity, futureURL, futureUVIndex)
      futureHumidityEl.textContent = futureHumidity + " %"
      futureDayEl.textContent = futureDt
      futureTempEl.textContent = futureTemp + " F"
      futureWindEl.textContent = futureWind + " mph"
      futureUVIEl.textContent = futureUVIndex + " uvi"
      futureIconEl.setAttribute("src", futureURL)
    })

}