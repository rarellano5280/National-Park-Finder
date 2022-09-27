var parkAPIKey = "pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1"
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1

var weatherAPIKey = "117a7453ee844f288c7182432222509"

function getWeatherForecast(lat, long) {
    var latitude = lat;
    var longitude = long;
    let weatherQueryURL = "https://api.weatherapi.com/v1/forecast.json?key=117a7453ee844f288c7182432222509&q=" + latitude + "," + longitude + "&days=5&aqi=no&alerts=no";
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Response Data :" + JSON.stringify(data))
        })
};


function getParkInfo(pCode) {
    parkCode = pCode;
    var parkQueryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1";
    fetch(parkQueryURL).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log("Park Data :", data.data);
            var lat = data.data[0].latitude;
            var long = data.data[0].longitude;
            getWeatherForecast(lat, long);
        })
};

// pulls map up
$(document).ready(function () {
    $('#map').usmap({});
});

const parksByState = [
    {state: "AL", parkCode: "liri"},
    {state: "AK", parkCode: "glba"},
    {state: "AZ", parkCode: "grca"},
    {state: "AR", parkCode: "hosp"},
    {state: "CA", parkCode: "yose"},
    {state: "CO", parkCode: "romo"},
    {state: "CT", parkCode: "appa"},
    {state: "DE", parkCode: "frst"},
    {state: "FL", parkCode: "ever"},
    {state: "GA", parkCode: "chat"},
    {state: "HI", parkCode: "havo"},
    {state: "ID", parkCode: "crmo"},
    {state: "IL", parkCode: "liho"},
    {state: "IN", parkCode: "indu"},
    {state: "IA", parkCode: "efmo"},
    {state: "KS", parkCode: "brvb"}]


// lets you click on map to run function
$('#map').usmap({
    stateHoverStyles: { fill: 'white' },
    showLabels: true,
    click: function (event, data) {
        // Output the abbreviation of the state name to the console
        console.log(data.name);
        for (var i = 0; i < parksByState.length; i++) {
            if (data.name == parksByState[i].state) {
                var pCode = parksByState[i].parkCode;
                getParkInfo(pCode);
            }
        }},
    });

