// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ec56ac147c5e9f2e5c8316e93df4cddd&units=imperial';

// Base URL for the Open Weather API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const lat = 'lat=';
const lon = '&lon=';

// URL for the GeoCoding API    
// Needed to convert the zip code input by the user to latitude and longtitude values
// Required by the base url
const helperURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    getCountryData(helperURL,zipCode,apiKey);
}

const getCountryData = async(URL,zipCode,apiKey) => {
    const res = await fetch(URL+zipCode+apiKey);
    try{
        const data = await res.json();
        console.log(data);
        getWeatherData(baseURL,data);
    } catch(error) {
        console.log('error',error);
    }
}

const getWeatherData = async(URL,data) => {
    const options = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    const res = await fetch(URL+lat+data.lat+lon+data.lon+apiKey,options);
    try{
        const data = await res.json();
        console.log(data);
    } catch(error) {
        console.log('error',error);
    }
}

