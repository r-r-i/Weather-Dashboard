var tempEl = document.querySelector("temp")
var windEl = document.querySelector("wind")
var humidEl = document.querySelector("humid")
var UvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${ApiKey}`

var ApiKey = '3504fa995df282c68b33b62fed2eee63';



const forecastToday = function(city){
    ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`

    fetch(ApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            document.getElementById('city').textContent = city;
            
            
            
            

            var lat = data.coord.lat;
            console.log(lat)
            var lon = data.coord.lon;
            console.log(lon);

            futureForecast(lat, lon);
        });
}


const futureForecast = function(lat, lon){
    ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${ApiKey}`

    fetch(ApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        document.getElementById('uvi').textContent = "UV Index: " + data.daily[0].uvi;
        document.getElementById('wind').textContent = "Wind: " + data.daily[0].wind_speed + "MPH";
        document.getElementById('humid').textContent = "Humidity: " + data.daily[0].humidity + "%";
        document.getElementById('temp').textContent = "Temp: " + Math.round(data.daily[0].temp.max - 273.15) / 1 + "°C";
    })

    
}
