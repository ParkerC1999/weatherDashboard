var key = "024d79cc80517b52a0d0655a853e97e8";
var searchBox = $("#search")[0];
var searchHistory = $("#history");
var results = $("#results");

function searchFunc() {
    searchBox = $("#input").val();
    console.log(searchBox);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBox}&appid=${key}`)
    .then(response => response.json())
    .then(results =>{
        const {lat, lon} = results[0];
        weather(lat, lon);
    });
    searchHistory.append(`<button class="searchButton row">${searchBox}</button>`);
    $(".searchButton").click(anotherSearch);
}

function anotherSearch() {
    var currentText = $(this).text();
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentText}&appid=${key}`)
    .then(response => response.json())
    .then(results =>{
        const {lat, lon} = results[0];
        weather(lat, lon);
    });
}

function weather(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`,
        method: "GET",
        dataType: "json",
        success: (data, status) => {
            results.empty();
               for(let i = 0; i < 6; i++){
                    const dt = new Date(parseInt(data.daily[i].dt) * 1000);
                    var uvScore = data.daily[i].uvi;
                    if (uvScore < 3) {
                        var uvStyle = "green";
                    } else if (3 < uvScore && uvScore < 6) {
                        var uvStyle = "yellow";
                    } else if ( 6 < uvScore && uvScore < 8) {
                        var uvStyle = "orange"
                    } else {
                        var uvStyle = "red"
                    } 
                    results.append(`<span>
                        <h4>${dt.toLocaleDateString()}</h4>
                        <div>
                            <ul>
                                <li>Temp: ${data.daily[i].temp.day} F</li>
                                <li>Wind: ${data.daily[i].wind_speed} mph</li>
                                <li>Humidity: ${data.daily[i].humidity}%</li>
                                <li class=${uvStyle}>UV Index: ${data.daily[i].uvi}</li>
                            <ul>
                        </div>
                    </span>`);
               }
        }
    })
}

// User input
// grab user input
// use api call call with user
// function api() {
//     fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=90&lon=-90&appid=024d79cc80517b52a0d0655a853e97e8")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
// }
// function latLong() {
//     fetch ("http://api.openweathermap.org/geo/1.0/direct?q=Layton,UT,US&appid=024d79cc80517b52a0d0655a853e97e8")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
// }
// api();
// latLong();
// information from api call on page
