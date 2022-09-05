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
const futureHumidityEls = document.querySelectorAll(".futureHumidity");
const futureWindEls = document.querySelectorAll(".futureWindSpeed");
const futureUVIEls = document.querySelectorAll(".futureUVI");
const futureIconEls = document.querySelectorAll(".futureIcon");
const futureDayEls = document.querySelectorAll(".futureDay");

// let futureArray = [".futureTemp", ".futureHumidity", "futureWindSpeed", ".futureUVI", ".futureIcon", ".futureDay" ]
const cityList = document.querySelector(".city-list")
let cityArray = []
const searchedCities = JSON.parse(localStorage.getItem("savedCities"))
if (searchedCities){
  cityArray = searchedCities
  for (let i = 0; i < cityArray.length; i++) {
    const element = cityArray[i];
    storeCity(element)
    
  }
}

function storeCity(city) {
  let listEl = document.createElement("li")
  listEl.textContent = city
  listEl.addEventListener("click", function(){
    getLL(city)
  })
  cityList.append(listEl)
}


//this is getting the button with the id of button from the html and assigning it to variable named button
var button = document.getElementById("button")

button.addEventListener("click", function () {
  city = document.getElementById("input").value;
  getLL(city)
});
//get the lat and long of city before using open weather
function getLL(city) {
  if (!cityArray.includes(city)){
    storeCity(city)
    cityArray.push(city)
    localStorage.setItem("savedCities", JSON.stringify(cityArray))

  }
  

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
      
      console.log(data.current);
      let currentDt = data.current.dt
      let dateString = moment.unix(currentDt).format("MM/DD/YYYY");
      let currentWind = data.current.wind_speed;
      let currentTemp = data.current.temp;
      let currentHumidity = data.current.humidity;
      let currentIcon = data.current.weather[0].icon;
      let currentURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
      let currentUVIndex = data.current.uvi;
      console.log(currentWind, currentTemp, currentHumidity, currentURL, currentUVIndex)
      currentHumidityEl.textContent = "Humidity: " + currentHumidity + " %"
      currentDayEl.textContent = dateString
      currentTempEl.textContent = "Temp: " + currentTemp + " °F"
      currentWindEl.textContent = "Wind: " + currentWind + " mph"
      currentUVIEl.textContent = "UVI: " + currentUVIndex
      currentIconEl.setAttribute("src", currentURL)

      //future weather days  
      console.log(data.daily.slice(1, 6));
      const futureArray = data.daily.slice(1, 6)
      for (let i = 0; i < futureArray.length; i++) {
        let futureDt = futureArray[i].dt
        let dateString = moment.unix(futureDt).format("MM/DD/YYYY");
        futureTempEls[i].textContent = "Temp: " + futureArray[i].temp.day + " °F";
        futureHumidityEls[i].textContent = "Humidity: " + futureArray[i].humidity + " %"
        futureDayEls[i].textContent = dateString
        futureWindEls[i].textContent = "Wind: " + futureArray[i].wind_speed + " mph"
        futureUVIEls[i].textContent = "UVI: " + futureArray[i].uvi
        let futureIcon = futureArray[i].weather[0].icon;
        let futureURL = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`
        futureIconEls[i].setAttribute("src", futureURL)
      }
      
    })

}