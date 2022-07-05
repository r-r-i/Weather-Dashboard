var tempEl = document.querySelector("temp")
var windEl = document.querySelector("wind")
var humidEl = document.querySelector("humid")

var ApiKey = '3504fa995df282c68b33b62fed2eee63';
var ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${ApiKey}`

var forecastToday = function(city){
    ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`

    fetch(ApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            document.getElementById('city').textContent = city;
            document.getElementById('temp').textContent = "Temp: " + data.main.temp;
            document.getElementById('wind').textContent = "Wind: " + data.wind.deg + "degrees";
            document.getElementById('humid').textContent = "Humidity: " + data.main.humidity;
            // document.getElementById('uvi').textContent = "UV Index: " + data.

            var lat = data.coord.lat;
            console.log(lat)
            var lon = data.coord.lon;
            console.log(lon);

        });

}


// 

var UvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${ApiKey}`

var forecastUV = function(city){
    ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${ApiKey}`

    fetch(ApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}
