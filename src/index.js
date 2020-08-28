let weatherInfo = document.getElementById('weatherInfo');
let loadingIcon = document.getElementById('loadingIcon');
let metricUnit = document.getElementById('metricUnit');
let imperialUnit = document.getElementById('imperialUnit');

const cityInput = document.getElementById('input');
const cityButton = document.getElementById('submit');
const name = document.getElementById('city');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const units = document.getElementById('units');
const image = document.getElementById('image');
const description = document.getElementById('description');

const apiKey = "e285565baa228a39f99aca44e22ed2c0";
let unit = 'metric';
cityInput.value = 'Belo Horizonte';

const setImage = (response, img) => {
    if (response == 'Rain' || response == 'Drizzle') {
        img.src = 'assets/images/rain.png';
    } else if (response == 'Thunderstorm' ) {
        img.src = 'assets/images/thunder.png';
    } else if (response == 'Snow') {
        img.src = 'assets/images/snow.png';
    } else if (response == 'Clear') {
        img.src = 'assets/images/clear.png';
    } else if (response =='Clouds') {
        img.src = 'assets/images/clouds.png';
    } else {
        img.src = 'assets/images/misc.png';
    }
}

function fetchWeather(city, unitValue) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitValue}`;
    loadingIcon.setAttribute('class', 'loader');
    weatherInfo.setAttribute('style', 'display: none');

    fetch(url, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        loadingIcon.setAttribute('style', 'display: none');
        weatherInfo.setAttribute('style', 'display: block');
        description.setAttribute('style', 'display: block');
        country.setAttribute('style', 'display: block');
        temp.setAttribute('style', 'display: block');
        units.setAttribute('style', 'display: flex');
        name.setAttribute('style', 'color: inherit');
        name.textContent = response.name;
        country.textContent = response.sys.country;
        temp.textContent = Math.round(response.main.temp) + '°';
        description.textContent = response.weather[0].description;
        setImage(response.weather[0].main, image);
    })
    .catch(function(err) {
        name.textContent = 'City not found. Please change your input.';
        name.setAttribute('style', 'color: red');
        image.src = 'assets/images/error.png';
        description.setAttribute('style', 'display: none');
        country.setAttribute('style', 'display: none');
        temp.setAttribute('style', 'display: none');
        units.setAttribute('style', 'display: none');
    });
}

cityButton.addEventListener('click', function() {
    loadingIcon.setAttribute('style', 'display: block');
    loadingIcon.setAttribute('class', 'loader');
    fetchWeather(cityInput.value, unit);
});

metricUnit.addEventListener('click', function() {
    unit = 'metric';
    this.setAttribute('class', 'active');
    imperialUnit.setAttribute('class', 'inactive');
    loadingIcon.setAttribute('style', 'display: block');
    fetchWeather(cityInput.value, unit);

})

imperialUnit.addEventListener('click', function() {
    unit = 'imperial';
    this.setAttribute('class', 'active');
    metricUnit.setAttribute('class', 'inactive');
    loadingIcon.setAttribute('style', 'display: block');
    fetchWeather(cityInput.value, unit);

})

document.addEventListener('DOMContentLoaded', function() {
    fetchWeather('Belo Horizonte', unit);
});
