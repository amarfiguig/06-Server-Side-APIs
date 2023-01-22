// The weather backround images

let weather = {
  
Clair: "https://images.unsplash.com/photo-1572003818138-19cf96ee15e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8c2t5fHx8fHx8MTY3MzMxNzIxNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
Cloud: "https://images.unsplash.com/photo-1595865749889-b37a43c4eba4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8c2t5fHx8fHx8MTY3MzM2MDU0OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
  Clouds: "https://images.unsplash.com/photo-1523556329929-93033da89632?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8b3ZlcmNhc3QgY2xvdWRzfHx8fHx8MTY3MzM2NDA4NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
  Rain: "https://images.unsplash.com/photo-1490713230272-bf236b61ad43?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8cmFpbnx8fHx8fDE2NzMzNjA4ODA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
Thunder: "https://images.unsplash.com/photo-1571878492895-23b0501dbb03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8dGh1bmRlcnx8fHx8fDE2NzMzNjMxNzQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
  Mis: "https://images.unsplash.com/photo-1476337721153-7c35c2d4346c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9nfHx8fHx8MTY3MzM2MzU1NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
  Snow:"https://images.unsplash.com/photo-1545504063-76a8056919a4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8c25vd3x8fHx8fDE2NzMzNjM2NTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
 
// API key from openweather API

 apiKey: "c626785f4efc47a6c4886288400f6c9f",
    
    
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found. Or API_KEY messing");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  saveLocation: function (city){
    const recentLocations=JSON.parse(localStorage.getItem("recentLocations")) || [];
    recentLocations.parse(city);
    localStorage.setItem ("recentLocations"=JSON.stringify(recentLocations));

    this.LoadRecentlocation();
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    this.weatherBackground(description,"current");
    
    document.querySelector(".forecast").classList.remove("hidden")
    
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name+"')";
  },

  fetchForecast: function (city) {
   fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city + 
        "&units=metric&appid="+
        this.apiKey
    )
    .then((res) => {
        if (!res.ok) {
          alert("No Forecast Found, Or ckeck your API_KEY validation");
          throw new Error("No Forecast.");
        }
        return res.json();
      })
    .then((data) => this.displayForecast(data));
  },

  displayForecast: function (data) {
    const icon= data.list[0].weather[0].icon;
    const description  = data.list[0].weather[0].description;
    const temp  = data.list[0].main.temp;
    const humidity  = data.list[0].main.humidity;
    const date  = data.list[0].dt_txt;
    const speed  = data.list[0].wind.speed;
    this.weatherBackground(description,"day1")
    document.getElementsByClassName("icon")[1].src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.getElementsByClassName("description")[1].innerText =
      description;
    document.getElementsByClassName("temp")[1].innerText =
      temp + "°C";
    document.getElementsByClassName("humidity")[1].innerText =
     "humidity: " +humidity + "%";
    document.getElementsByClassName("date")[0].innerText =
     "Tomorrow";
    document.getElementsByClassName("wind")[1].innerText =
     "Wind Speed: " +speed + "km/h";
    const forecastArray = document.getElementsByClassName("day")
   for (let i = 1; i < forecastArray.length; i++) {
    var index = 8*i +7
    const icon= data.list[index].weather[0].icon;
    const description  = data.list[index].weather[0].description;
    const temp  = data.list[index].main.temp;
    const humidity  = data.list[index].main.humidity;
    const date  = data.list[index].dt_txt;
    const speed  = data.list[index].wind.speed;
      this.weatherBackground(description,"day"+(i+1));
    document.getElementsByClassName("icon")[i+1].src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.getElementsByClassName("description")[i+1].innerText =
      description;
    document.getElementsByClassName("temp")[i+1].innerText =
      temp + "°C";
    document.getElementsByClassName("humidity")[i+1].innerText =
     "humidity: " +humidity + "%";
    document.getElementsByClassName("date")[i].innerText =
     date.substring(0,10).split("-")[2]+"/"+date.substring(0,10).split("-")[1]+"/"+date.substring(0,10).split("-")[0];
    document.getElementsByClassName("wind")[i+1].innerText =
     "Wind Speed: " +speed + "km/h";
   } 
  },

  search: function () {

    const searchTerm = document.querySelector(".search_bar").value;
    if (searchTerm) {
      this.fetchWeather(searchTerm);
      this.fetchForecast(searchTerm)

      this.saveLocation(searchTerm);
    }
    else {
    alert("Please entre a city name");
    }
  },


  weatherBackground: function (desc,id) {
    
    if (!desc.localeCompare("clear sky") || !desc.localeCompare("few clouds") ) {
      document.getElementById(id).style.backgroundImage = "url("+this.Clair+")";
      document.getElementById(id).style.opacity = "0.8";
      document.getElementById(id).style.color = "black";
    }else if (!desc.localeCompare("scattered clouds") || !desc.localeCompare("broken clouds") ) {

      document.getElementById(id).style.backgroundImage = "url("+this.Cloud+")";
      document.getElementById(id).style.opacity = "0.8";
      document.getElementById(id).style.color = "black";
    }else if( !desc.localeCompare("light intensity drizzle")|| !desc.localeCompare("cloudy")|| !desc.localeCompare("overcast clouds")  ) {

      document.getElementById(id).style.backgroundImage = "url("+this.Clouds+")";
      document.getElementById(id).style.opacity = "0.8";
      document.getElementById(id).style.color = "black";
    }else if (!desc.localeCompare("light rain")  ||!desc.localeCompare("shower rain")|| !desc.localeCompare("rain")) {

      document.getElementById(id).style.backgroundImage = "url("+this.Rain+")";
      document.getElementById(id).style.opacity = "0.8";
      document.getElementById(id).style.color = "black";
    }else if(!desc.localeCompare("thunderstorm")) {
      
      document.getElementById(id).style.backgroundImage = "url("+this.Thunder+")";
      document.getElementById(id).style.opacity = "0.8";
    }else if (!desc.localeCompare("mist")){

      document.getElementById(id).style.backgroundImage = "url("+this.Mist+")";
      document.getElementById(id).style.opacity = "0.8";
    }else {

      document.getElementById(id).style.backgroundImage = "url("+this.Snow+")";
      document.getElementById(id).style.opacity = "0.8";
    }
  },
LoadRecentlocation: function () {
  const select = document.getElementById("recent-locations");
 
  select.innerHTML = "";

  const recentLocations = JSON.parse(localStorage.getItem("recentLocations")) || [];
  
  recentLocations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    option.addEventListener("click", this.oneClickRecentLocations.bind(this));
    select.appendChild(option);
    });
  },
  oneClickRecentLocations, function (event) {
   const location = event.target.value;
  
   this.fetchWeather(location);
   this.fetchWeather(location);
  }
};




document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.LoadRecentlocation();
