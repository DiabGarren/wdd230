let weather = document.querySelector("#weather");
if (weather == null) {} else {
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
    const url = "//api.openweathermap.org/data/2.5/forecast?lat=33.158089&lon=-117.350594&appid=d5897d892fdcc9e1e7610ad94239af0b&units=metric";

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
    const name = document.querySelector("#city");
    const weatherImg = document.querySelector("#weather-img");
    const weatherIcon = document.createElement("img");
    const weatherDesc = document.querySelector("#weather-desc");
    const temp = document.querySelector("#weather-temp");
    const forcast = document.querySelector("#weather-forcast");

    const city = weatherData.city.name;
    
    const iconSrc = `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`;
    const desc = weatherData.list[0].weather[0].description;
    const windSpeed = weatherData.list[0].wind.speed;
    const humidity = weatherData.list[0].main.humidity;

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

    name.textContent = city;

    temp.innerHTML = `Temperature: ${weatherData.list[0].main.temp.toFixed(0)}&#8451<br>
    Feels like: ${weatherData.list[0].main.feels_like.toFixed(0)}&#8451<br>
    High / Low: ${weatherData.list[0].main.temp_max.toFixed(0)}&#8451 / ${weatherData.list[0].main.temp_min.toFixed(0)}&#8451`;

    weatherImg.appendChild(weatherIcon);
    weatherDesc.innerHTML = `Weather Condition: ${newDesc}<br>
    WindSpeed: ${windSpeed}km/h<br>
    Humidity: ${humidity}%`;
};