// selectors
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

// api key
const apiKey = "edc228562ac0a8aa3116d41c0687cf56";

// Global
let cityName;
let sunSet;
let sunRise;
let ySunSet;
let ySunRise;

fetch(`https://api.sunrise-sunset.org/json?&city=${input.value}&date=today`)
    .then(response => response.json())
    .then(data => {
        const { results } = data;
        sunSet = results.sunset;
        sunRise = results.sunrise;
    })
    .catch(() => {
        sunSet = "nout found";
        sunRise = "nout found";
    });

function creatYourCity() {
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=9dd1ce777c9a450992f9a05a8811a127")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { city, country_flag } = data;
            cityName = city;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const { main, name, sys, weather } = data;
                    const li = document.createElement("li")
                    li.classList.add("city");
                    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`
                    const markup = `
                                <h2 class='city-name' data-name=${name},${sys.country}>
                                    <span>${name}</span>
                                    <span>${sys.country}</span> 
                                    <img class='country-flag' src='${country_flag}' style='width: 30px; display: inline;'>
                                    <br> 
                                    <span>SR  ${sunRise}</span> <br>
                                    <span>SS  ${sunSet}</span>
                                </h2>
                                <div class='city-temp'>${Math.round(main.temp)}<sup>°C</sup></div>
                                <figure>
                                    <img class='city-icon' src='${icon}' alt ='city' >
                                    <figurecaption>${weather[0]["description"]}</figurecaption>
                                </figure>
                            `;
                    li.innerHTML = markup;
                    list.appendChild(li);
                    msg.innerHTML = "";
                })
                .catch(() => msg.innerHTML = "Your city not found");
        })
};

fetch(`https://api.sunrise-sunset.org/json?&city=${cityName}&date=today`)
    .then(response => response.json())
    .then(data => {
        const { results } = data;
        ySunSet = results.sunset;
        ySunRise = results.sunrise;
    })
    .catch(() => {
        ySunSet = "nout found";
        ySunRise = "nout found";
    });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { main, name, sys, weather } = data;
            const li = document.createElement("li")
            li.classList.add("city");
            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`
            const markup = `
                        <h2 class='city-name' data-name=${name},${sys.country}>
                            <span>${name}</span>
                            <span>${sys.country}</span> <br> 
                            <span>SR  ${sunRise}</span> <br>
                            <span>SS  ${sunSet}</span>
                        </h2>
                        <div class='city-temp'>${Math.round(main.temp)}<sup>°C</sup></div>
                        <figure>
                            <img class='city-icon' src='${icon}' alt ='city' >
                            <figurecaption>${weather[0]["description"]}</figurecaption>
                        </figure>
                    `;
            li.innerHTML = markup;
            list.appendChild(li);
            msg.innerHTML = "";
        })
        .catch(() => msg.innerHTML = "Search for a valid city");
    input.value = "";
});

creatYourCity();