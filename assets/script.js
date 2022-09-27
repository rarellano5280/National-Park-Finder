//var parkApiKey = "pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1"
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=pEl7mMX3orgycwe1sObUzotP8ZSa4vTgqOeL8Xf1


//Returns the date as a json to an array of object
// function getApi() {
//     // fetch request gets a list of all the repos for the node.js organization
//     var requestUrl = '...';

//     fetch(requestUrl)//promise based function
//       .then(function (response) {
//         return response.json();
//       })

//fetchButton.addEventListener('click', getApi);

$(document).ready(function () {
    $('#map').usmap({});
});

$('#map').usmap({
    click: function (event, data) {
        // Output the abbreviation of the state name to the console
        console.log(data.name);
    }
});