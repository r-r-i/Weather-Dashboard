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

            document.getElementById('city').textContent = city + moment().format('DD-MM-YY');

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

        for (i = 0; i < 5; i++) {
            document.getElementById('date' + (i + 1)).textContent = moment().add(i + 1, 'd').format('DD-MM-YY');

            let icon = data.daily[i].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            document.getElementById('icon' + (i + 1)).setAttribute('src',iconURL)
            document.getElementById('temp' + (i + 1)).textContent = "Temp: " + Math.round(data.daily[i].temp.max - 273.15) / 1 + "°C";
            document.getElementById('wind' + (i + 1)).textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
            document.getElementById('humid'+ (i + 1)).textContent = "Humidity: " + data.daily[i].humidity + "%";
        }

        document.getElementById('uvHead').textContent = "UV Index: " + data.daily[0].uvi;
        document.getElementById('windHead').textContent = "Wind: " + data.daily[0].wind_speed + "MPH";
        document.getElementById('humidHead').textContent = "Humidity: " + data.daily[0].humidity + "%";
        document.getElementById('tempHead').textContent = "Temp: " + Math.round(data.daily[0].temp.max - 273.15) / 1 + "°C";
    })

    
}
