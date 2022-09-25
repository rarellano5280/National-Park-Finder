//var parkAPIKey = "pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1"
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1

var weatherAPIKey = "117a7453ee844f288c7182432222509"

var currentCity = "";

// pulls 5 day forecast data from API
function getWeatherForecast(searchedCity){
    var weatherQueryURL = "http://api.weatherapi.com/v1/forecast.json?key=117a7453ee844f288c7182432222509&q=" + searchedCity + "&days=5&aqi=no&alerts=no";
    fetch(weatherQueryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("data :" +JSON.stringify(data))
        saveSearch(searchedCity);
        showHistory()
    });
}

function showHistory(){
    $('#search-history').empty();
        if (localStorage.length===0){
            if (previousSearch){
                $('.city-search').attr("value", previousSearch);
            } else {
                $('.city-search').attr("value", "Colorado");
        }
    } else {
        let prevCityKey= "cities" + (localStorage.length-1);
        previousSearch=localStorage.getItem(prevCityKey);
        $('.city-search').attr("value", previousSearch);
        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.getItem("cities" + i);
            let cityEl;
                if (currentCity===""){
                currentCity=previousSearch;
                }
            cityEl = `<button type="button">${city}</button>`;
                $('#search-history').append(cityEl);
        }
}}


var saveSearch = function(newSearch){
    let repeat = false;
// Check if search in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newSearch) {
            repeat = true;
            break;
        }
    }
// Save to localStorage if search is new
    if (repeat === false) {
        localStorage.setItem('cities' + localStorage.length, newSearch);
    }
}






// seach button event listener
$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var newCity = $("#city").val();
    getWeatherForecast(newCity);
});

// makes search history buttons clickable
$("#search-history").on("click", function(event){
    event.preventDefault();
    var historyBtn = event.target.textContent;
    getCityWeather(historyBtn);
    getForecast(historyBtn);
});