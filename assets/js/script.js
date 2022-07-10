// var tempEl = document.querySelector("temp")
// var windEl = document.querySelector("wind")
// var humidEl = document.querySelector("humid")
const ApiKey = '3504fa995df282c68b33b62fed2eee63';
const searchBtn = document.getElementById('searchCity');

let input = document.querySelector('input[type = "search"]');
let containerDiv = document.getElementById('container');
let recentButton = document.getElementsByClassName('recentBtn');

// Array that stores previously searched city
let state = {
    previousCity: []
}


// Event listener for Search button. 
searchBtn.addEventListener('click', function(event){
    event.preventDefault;
    console.log(input.value)
    citySearch();
    renderLastSearch()
})

// function hasDuplicates(previousCity){
//     let valuesSoFar = Object.create(null);
//     for (var i = 0; i < state.previousCity.length ; i++){
//         var value = previousCity[i];
//             if (value in valuesSoFar){
//                 return;
//             } else {
//                 state.previousCity.push(city);
//                 saveCity();
//             }

//     }
// }


// API call that retrieves the data for todays forecast.
const forecastToday = function(city){
    ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;

    // hasDuplicates()
    state.previousCity.push(city);
    saveCity();

    fetch(ApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('city').textContent = city + " " + moment().format('D-M-Y');

            let lat = data.coord.lat;
            console.log(lat)
            let lon = data.coord.lon;
            console.log(lon);

            futureForecast(lat, lon);
        });

        
}



// API call that retrieves the forecast for the next 5 days.
const futureForecast = function(lat, lon){
    ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${ApiKey}`


    fetch(ApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

        for (i = 0; i < 5; i++) {
            document.getElementById('date' + (i + 1)).textContent = moment().add(i + 1, 'd').format('D-M-Y');

            let icon = data.daily[i].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            document.getElementById('icon' + (i + 1)).setAttribute('src',iconURL)
            document.getElementById('temp' + (i + 1)).textContent = "Temp: " + Math.round(data.daily[i].temp.max - 273.15) / 1 + "°C";
            document.getElementById('wind' + (i + 1)).textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
            document.getElementById('humid'+ (i + 1)).textContent = "Humidity: " + data.daily[i].humidity + "%";
        }

            document.getElementById('uvHead').textContent = data.daily[0].uvi;
            document.getElementById('uvHead').setAttribute("class", uvColor(data.daily[0].uvi) );
            document.getElementById('windHead').textContent = "Wind: " + data.daily[0].wind_speed + "MPH";
            document.getElementById('humidHead').textContent = "Humidity: " + data.daily[0].humidity + "%";
            document.getElementById('tempHead').textContent = "Temp: " + Math.round(data.daily[0].temp.max - 273.15) / 1 + "°C";
        })
}



// Function that changes the color of UV Index based on intensity.
const uvColor = (uvIndex) => {
    if (uvIndex < 3){
        return "fav";
    } else if (uvIndex <= 6){
        return "mod";
    } else return 'sev';
}

const citySearch = ()=> {
    let city = input.value;
    forecastToday(city);
}
// Function that stores the searched for city.
let saveCity = () => {
    localStorage.setItem("previousCity" , JSON.stringify(state));
}
// Function that gets the stored array of previously search for cities.
let loadCity = () => {
    state = JSON.parse(localStorage.getItem("previousCity")) || { previousCity: [] };
}


// Function that creates a button for each city searched for.
let renderLastSearch = () => {
    loadCity();

    let div = document.getElementById("recent-result");
    div.innerHTML = "";

    if(state.previousCity.length > 0){
        for (let i = 0; i < state.previousCity.length; i++){

            let create = document.createElement("button")
            create.setAttribute("class", "recentBtn recentButton")
            create.setAttribute("type", "button")
    
            let node = document.createTextNode(state.previousCity[i])
            create.addEventListener('click', function(event){
                event.preventDefault;
                forecastToday(state.previousCity[i]);
            });
            create.appendChild(node)
            div.appendChild(create)
        
            console.log(state)
            
        }
    }
    saveCity()
}


renderLastSearch()


// TO DO: LOCAL STORAGE IS NOT SAVED ON PAGE RELOAD..
// DISPLAY CITY'S WEATHER INFORMATION ON BUTTON CLICK. FIX EVENT LISTENER.





