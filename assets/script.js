// variables set
var parkAPIKey = "pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1";
var weatherAPIKey = "117a7453ee844f288c7182432222509";
var parkinfoContainer = document.getElementById("parkinfo");
var parkdataContainer = document.getElementById("parkdata");
var contactContainer = document.getElementById("contactinfo");
var toDoContainer = document.getElementById("thingstodo");
var dataEl = document.querySelector("#data");
var historyContainer = document.getElementById("history");

// array of park data
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
];

// takes lat and long from park API and displays forecast for that area
function getWeatherForecast(lat, long) {
    var latitude = lat;
    var longitude = long;
    let weatherQueryURL = "https://api.weatherapi.com/v1/forecast.json?key=117a7453ee844f288c7182432222509&q=" + latitude + "," + longitude + "&days=5&aqi=no&alerts=no";
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
// creates forecast div
            let forecastHTML = `
            <h3>5-Day Forecast</h3>
            <div ml-10></div>`;
            data.forecast.forecastday.forEach((dayOfWeek) => {
                var date = dayOfWeek.date;
                var icon = dayOfWeek.day.condition.icon;
                var humidity = dayOfWeek.day.avghumidity;
                var highTemp = dayOfWeek.day.maxtemp_f;
                var lowTemp = dayOfWeek.day.mintemp_f;
// puts data from API into forecast HTML
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


// gets data from park API & calls functions to display data
function getParkInfo(pCode) {
    parkCode = pCode;
    var parkQueryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1";
    fetch(parkQueryURL).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            var lat = data.data[0].latitude;
            var long = data.data[0].longitude;
            getWeatherForecast(lat, long);
            thingsToDo(data.data);
            generalInfo(data.data);
// local storage function
            var saveSearch = function (park) {
                var park = data.data[0].name;
                let repeat = false;
// Check if search in local storage
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage["parks" + i] === park) {
                        repeat = true;
                        break;
                    }
                }
// Save to localStorage if search is new
                if (repeat === false) {
                    localStorage.setItem('parks' + localStorage.length, park);

                }
            };
            saveSearch(data.data[0].name);
        })
};

// renders parl-specific featured activities and entrance fees to page
function thingsToDo(data) {
    var toDoTitle = document.createElement("h4");
    toDoTitle.textContent = "Featured Activities: ";
    var toDoList = document.createElement("h3");
    for (let i = 0; i < 4; i++) {
        var listItems = document.createElement("li");
        listItems.textContent = data[0].activities[i].name;
        toDoList.appendChild(listItems);
    }
    toDoTitle.appendChild(toDoList);
    toDoContainer.appendChild(toDoTitle);

    if (data[0].states == "GA" || data[0].states == "AR") {

    } else {
        var entranceFees = document.createElement("h3");
        entranceFees.textContent = "Entrance Fees: $" + data[0].entranceFees[0].cost;
        toDoList.appendChild(entranceFees);
    };
}

function getHistory() {
    for (let i = 0; i < localStorage.length; i++) {
        var storedParks = localStorage.getItem('parks' + [i]);
        console.log(storedParks);
        var historyList = document.createElement("ul");
        var historyItem = document.createElement("li");
        historyItem.textContent = storedParks;
        historyList.appendChild(historyItem);
        historyContainer.appendChild(historyList);
    }
}

// displays data from park API
function generalInfo(data) {

// renders park name, image, and address 
    var infoBox = document.createElement("h1");
    infoBox.textContent = data[0].fullName;

    var img = document.createElement("img");
    img.setAttribute("style", "width: 600px; height: 475px;");
    img.setAttribute("src", data[0].images[0].url);
    infoBox.appendChild(img);
    parkdataContainer.appendChild(infoBox);

    var address = document.createElement("h4");
    address.textContent = "Park Address: " + data[0].addresses[0].line1 + " " + data[0].addresses[0].city + ", " + data[0].addresses[0].stateCode + " " + data[0].addresses[0].postalCode;
    infoBox.appendChild(address);

// creates box for park hours and inputs data from API
    var infoTitle = document.createElement("h4");
    var infoList = document.createElement("ul");
    infoTitle.appendChild(infoList);
    var dayTitleArray = ["Monday: ", "Tuesday: ", "Wednesday: ", "Thursday: ", "Friday: ", "Saturday: ", "Sunday: "];
    for (var i = 0; i < dayTitleArray.length; i++) {
        var dayArray = [data[0].operatingHours[0].standardHours.monday, data[0].operatingHours[0].standardHours.tuesday, data[0].operatingHours[0].standardHours.wednesday, data[0].operatingHours[0].standardHours.thursday, data[0].operatingHours[0].standardHours.friday, data[0].operatingHours[0].standardHours.saturday, data[0].operatingHours[0].standardHours.sunday];
        var hours = document.createElement("li");
        hours.textContent = dayTitleArray[i] + dayArray[i];
        infoList.appendChild(hours);
        infoTitle.appendChild(infoList);
        parkinfoContainer.appendChild(infoTitle);
    };
    
// creates contact info box and inputs data from API
    var contactInfo = document.createElement("h3");
    contactInfo.textContent = "Contact Info: "
    var email = document.createElement("li");
    email.textContent = "Email: " + data[0].contacts.emailAddresses[0].emailAddress;
    contactInfo.appendChild(email);
    var phone = document.createElement("li");
    phone.textContent = "Phone: " + data[0].contacts.phoneNumbers[0].phoneNumber;
    contactInfo.appendChild(phone);
    contactContainer.appendChild(contactInfo);
};

// pulls map up
$(document).ready(function () {
    $('#map').usmap({});
});

// lets you click on map to run functions & see output
$('#map').usmap({
    stateHoverStyles: { fill: 'white' },
    showLabels: true,
    click: function (event, data) {
        for (var i = 0; i < parksByState.length; i++) {
            if (data.name == parksByState[i].state) {
                var pCode = parksByState[i].parkCode;
                getParkInfo(pCode);
            }
        };
        dataEl.classList.remove("hide");
        $(parkinfoContainer).empty();
        $(parkdataContainer).empty();
        $(toDoContainer).empty();
        $(contactContainer).empty();
    },
});

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
        getHistory();
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

