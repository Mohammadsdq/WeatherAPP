// selectors
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

// api key
const apiKey = "edc228562ac0a8aa3116d41c0687cf56";

// Global
let cityName;

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
                    // start change ss sr time
                    let srTime = sys.sunrise;
                    srTime = new Date(srTime)
                    srTime = `${srTime.getHours()}:${srTime.getMinutes()}`;
                    let ssTime = sys.sunset;
                    ssTime = new Date(ssTime)
                    ssTime = `${ssTime.getHours()}:${ssTime.getMinutes()}`;
                    // end change ss sr time
                    const li = document.createElement("li")
                    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`
                    li.classList.add("city", `${weather[0].main}`);
                    const markup = ` 
                                    <h2 class='city-name' data-name=${name},${sys.country}>
                                        <span>${name}</span>
                                        <span>${sys.country}</span> 
                                        <img class='country-flag' src='${country_flag}' style='width: 30px; display: inline;'>
                                        <br> 
                                        <span>SR  ${srTime}</span> <br>
                                        <span>SS  ${ssTime}</span>
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


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { main, name, sys, weather } = data;
            // start change ss sr time
            let srTime = sys.sunrise;
            srTime = new Date(srTime)
            srTime = `${srTime.getHours()}:${srTime.getMinutes()}`;
            let ssTime = sys.sunset;
            ssTime = new Date(ssTime)
            ssTime = `${ssTime.getHours()}:${ssTime.getMinutes()}`;
            // end change ss sr time
            const li = document.createElement("li")
            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`
            li.classList.add("city", `${weather[0].main}`);
            const markup = `
                        <h2 class='city-name' data-name=${name},${sys.country}>
                            <span>${name}</span>
                            <span>${sys.country}</span> <br> 
                            <span>SR  ${srTime}</span> <br>
                            <span>SS  ${ssTime}</span>
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