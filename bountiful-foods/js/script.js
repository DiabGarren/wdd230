let weather = document.querySelector("#weather");
if (weather == null) {} else {
    const url = "//api.openweathermap.org/data/2.5/weather?id=936374&appid=d5897d892fdcc9e1e7610ad94239af0b&units=metric";

    apiFetch(url);
}
async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

const displayResults = (weatherData) => {
    console.log(weatherData);
    const weatherImg = document.querySelector("#weather-img");
    const weatherIcon = document.createElement("img");
    const weatherDesc = document.querySelector("#weather-desc");
    const temp = document.querySelector("#weather-temp");
    const forcast = document.querySelector("#weather-forcast");

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;

    let newDesc = "";
    for (let i = 0; i < desc.length; i++) {
        if (desc[i - 1] == " " || i == 0) {
            newDesc += desc[i].toUpperCase();
        } else {
            newDesc += desc[i];
        }
    }
    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", newDesc);

    temp.innerHTML = `Temperature: ${weatherData.main.temp.toFixed(0)}&#8451<br>
    Feels like: ${weatherData.main.feels_like.toFixed(0)}&#8451<br>
    High / Low: ${weatherData.main.temp_max.toFixed(0)}&#8451 / ${weatherData.main.temp_min.toFixed(0)}&#8451`;

    weatherImg.appendChild(weatherIcon);
    weatherDesc.innerHTML = `Weather Condition: ${newDesc}<br>
    WindSpeed: ${windSpeed}km/h<br>
    Humidity: ${humidity}%`;
};