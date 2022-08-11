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
    const feeling = document.getElementById('feeling').value;
    getCountryData(helperURL,zipCode,apiKey)
    .then(function(data) {
        getWeatherData(baseURL,data)
        .then(function(data) {
            data.feeling = feeling;
            postData('/postWeatherData',data);
            updateUI();
         })
     })

}

const getCountryData = async(URL,zipCode,apiKey) => {
    const res = await fetch(URL+zipCode+apiKey);
    try{
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error',error);
    }
}

const getWeatherData = async(URL,data) => {
    const res = await fetch(URL+lat+data.lat+lon+data.lon+apiKey);
    try{
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error',error);
    }
    
}

const postData = async(URL,data) => {
    const options = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(URL,options);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error',error);
    }
}

const updateUI = async() => {
    const res = await fetch('/getWeatherData');
    try {
        const allData = await res.json();
        //console.log(allData);
        document.getElementById('date').innerHTML = 'Date: ' + allData.date.day + ' / ' + allData.date.month + ' / ' + allData.date.year
        document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = 'Feelings:'  + allData.feeling;

    } catch(error) {
        console.log('error', error);
    }

}



