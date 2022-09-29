var parkAPIKey = "pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1"
var weatherAPIKey = "117a7453ee844f288c7182432222509"

const parksByState = [
    { state: "AL", parkCode: "liri" },
    { state: "AK", parkCode: "glba" },
    { state: "AZ", parkCode: "grca" },
    { state: "AR", parkCode: "hosp" },
    { state: "CA", parkCode: "yose" },
    { state: "CO", parkCode: "romo" },
    { state: "CT", parkCode: "appa" },
    { state: "DE", parkCode: "frst" },
    { state: "FL", parkCode: "ever" },
    { state: "GA", parkCode: "chat" },
    { state: "HI", parkCode: "havo" },
    { state: "ID", parkCode: "crmo" },
    { state: "IL", parkCode: "liho" },
    { state: "IN", parkCode: "indu" },
    { state: "IA", parkCode: "efmo" },
    { state: "KS", parkCode: "brvb" },
    { state: "KY", parkCode: "maca" },
    { state: "LA", parkCode: "cari" },
    { state: "ME", parkCode: "acad" },
    { state: "MD", parkCode: "fomc" },
    { state: "MA", parkCode: "bost" },
    { state: "MI", parkCode: "piro" },
    { state: "MN", parkCode: "voya" },
    { state: "MS", parkCode: "guis" },
    { state: "MO", parkCode: "jeff" },
    { state: "MT", parkCode: "glac" },
    { state: "NE", parkCode: "scbl" },
    { state: "NV", parkCode: "lake" },
    { state: "NH", parkCode: "saga" },
    { state: "NJ", parkCode: "gate" },
    { state: "NM", parkCode: "azru" },
    { state: "NY", parkCode: "sara" },
    { state: "NC", parkCode: "grsm" },
    { state: "ND", parkCode: "thro" },
    { state: "OH", parkCode: "cuva" },
    { state: "OK", parkCode: "chic" },
    { state: "OR", parkCode: "orca" },
    { state: "PA", parkCode: "inde" },
    { state: "RI", parkCode: "blrv" },
    { state: "SC", parkCode: "cong" },
    { state: "SD", parkCode: "wica" },
    { state: "TN", parkCode: "grsm" },
    { state: "TX", parkCode: "gumo" },
    { state: "UT", parkCode: "zion" },
    { state: "VT", parkCode: "mabi" },
    { state: "VA", parkCode: "blri" },
    { state: "WA", parkCode: "olym" },
    { state: "WV", parkCode: "neri" },
    { state: "WI", parkCode: "apis" },
    { state: "WY", parkCode: "yell" },
]

function getWeatherForecast(lat, long) {
    var latitude = lat;
    var longitude = long;
    let weatherQueryURL = "https://api.weatherapi.com/v1/forecast.json?key=117a7453ee844f288c7182432222509&q=" + latitude + "," + longitude + "&days=5&aqi=no&alerts=no";
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Response Data :", data);
            let forecastHTML = `
            <h3>5-Day Forecast</h3>
            <div ml-10></div>`;
            data.forecast.forecastday.forEach((dayOfWeek) => {
                console.log(dayOfWeek);
                var date = dayOfWeek.date;
                var icon = dayOfWeek.day.condition.icon;
                var humidity = dayOfWeek.day.avghumidity;
                var highTemp = dayOfWeek.day.maxtemp_f;
                var lowTemp = dayOfWeek.day.mintemp_f;

                forecastHTML += `
                <div class="forecast">
                  <ul class="text-sm list-unstyled">
                      <li><h5>${new Date(date).toDateString()}</h5></li>
                        <li><img src="https:${icon}"></li>
                      <li>High: ${highTemp}&#8457;</li>
                      <li>Low: ${lowTemp}&#8457;</li>
                      <li>Humidity: ${humidity}%</li>
                  </ul>
                </div>`;
                forecastHTML += `</div>`;
                $('#forecast-container').html(forecastHTML);
            })
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
            thingsToDo(data.data);
            generalInfo(data.data);
        })
};

var toDoContainer = document.getElementById("thingstodo");

function thingsToDo(data) {
    console.log(data);
    var toDoTitle = document.createElement("h4");
    toDoTitle.textContent = "Featured Activities: ";
    var toDoList = document.createElement("ul");
    for (let i = 0; i < 4; i++) {
        var listItems = document.createElement("li");
        listItems.textContent = data[0].activities[i].name;
        toDoList.appendChild(listItems);
    }
    toDoTitle.appendChild(toDoList);
    toDoContainer.appendChild(toDoTitle);
}

var parkinfoContainer = document.getElementById("parkinfo");
var parkdataContainer = document.getElementById("parkdata");


function generalInfo(data) {

    var infoBox = document.createElement("h1");
    infoBox.textContent = data[0].fullName;
    var img = document.createElement("img");
    img.setAttribute("src", data[0].images[0].url);
    infoBox.appendChild(img);
    parkdataContainer.appendChild(infoBox);

    var address = document.createElement("h4");
    address.textContent = "Park Address: " + data[0].addresses[0].line1 + " " + data[0].addresses[0].city + ", " + data[0].addresses[0].stateCode + " " + data[0].addresses[0].postalCode;
    infoBox.appendChild(address);

    var infoTitle = document.createElement("h4");

    var infoList = document.createElement("ul");
    infoTitle.appendChild(infoList);
    
    var dayTitleArray = ["Monday: ", "Tuesday: ", "Wednesday: ", "Thursday: ", "Friday: ", "Saturday: " , "Sunday: "];
    
    for (var i = 0; i < dayTitleArray.length; i++) {
        var dayArray = [data[0].operatingHours[0].standardHours.monday, data[0].operatingHours[0].standardHours.tuesday, data[0].operatingHours[0].standardHours.wednesday, data[0].operatingHours[0].standardHours.thursday, data[0].operatingHours[0].standardHours.friday, data[0].operatingHours[0].standardHours.saturday, data[0].operatingHours[0].standardHours.sunday];
        var hours = document.createElement("li");
        hours.textContent = dayTitleArray[i] + dayArray[i];
        // hours.textContent = data[0].operatingHours[0].description;
        infoList.appendChild(hours);
    }
    if (data[0].states == "GA" || data[0].states == "AR") {
        
    } else {
        var entranceFees = document.createElement("li");
    entranceFees.textContent = "Entrance Fees: $" + data[0].entranceFees[0].cost;
    infoList.appendChild(entranceFees);
    };

    var email = document.createElement("li");
    email.textContent = "Email: " + data[0].contacts.emailAddresses[0].emailAddress;
    infoList.appendChild(email);
    var phone = document.createElement("li");
    phone.textContent = "Phone: " + data[0].contacts.phoneNumbers[0].phoneNumber;
    infoList.appendChild(phone);
    parkinfoContainer.appendChild(infoTitle);
};

// pulls map up
$(document).ready(function () {
    $('#map').usmap({});
});

// lets you click on map to run function
$('#map').usmap({
    stateHoverStyles: { fill: 'white' },
    showLabels: true,
    click: function (event, data) {
        // Output the abbreviation of the state name to the console
        console.log(data.name);
        localStorage.setItem("state", data.name);
        for (var i = 0; i < parksByState.length; i++) {
            if (data.name == parksByState[i].state) {
                var pCode = parksByState[i].parkCode;
                getParkInfo(pCode);
            }
        };
        $(parkinfoContainer).empty();
        $(parkdataContainer).empty();
        $(toDoContainer).empty();
    },
});

