const currMonth = new Date().getMonth() + 1;
const currDay = new Date().getDate();

let weather = document.querySelector("#weather");
if (weather == null) {} else {
    const url = "//api.openweathermap.org/data/2.5/forecast?lat=33.158089&lon=-117.350594&appid=d5897d892fdcc9e1e7610ad94239af0b&units=imperial";

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
    const name = document.querySelector("#city");
    const weatherImg = document.querySelector("#weather-img");
    const weatherIcon = document.createElement("img");
    const weatherDesc = document.querySelector("#weather-desc");
    const temp = document.querySelector("#weather-temp");
    const forcast = document.querySelector("#weather-forcast");

    const city = weatherData.city.name;
    const days = weatherData.list;
    for (let i = 0; i < days.length; i++) {
        let year = days[i].dt_txt.substring(0, 4);
        let month = days[i].dt_txt.substring(5, 7);
        let day = days[i].dt_txt.substring(8, 10);
        let time = days[i].dt_txt.substring(11, 13);
        if (month == currMonth && day <= currDay + 3 && time == "12") {
            let temp = days[i].main.temp;
            let high = days[i].main.temp_max;
            let low = days[i].main.temp_min;
            forcast.innerHTML += `<h2>${year}-${month}-${day}</h2>
            <p>Temp @ Noon: <b>${temp}&#8457</b><br>High / Low: ${high}&#8457 / ${low}&#8457<br><br></p>`;
        }
    }

    const iconSrc = `https://openweathermap.org/img/w/${days[0].weather[0].icon}.png`;
    const desc = days[0].weather[0].description;
    const windSpeed = days[0].wind.speed;
    const humidity = days[0].main.humidity;

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

    temp.innerHTML = `<p>Temperature: ${days[0].main.temp.toFixed(0)}&#8457<br>Feels like: ${days[0].main.feels_like.toFixed(0)}&#8457<br>High / Low: ${days[0].main.temp_max.toFixed(0)}&#8457 / ${days[0].main.temp_min.toFixed(0)}&#8457</p>`;

    weatherImg.appendChild(weatherIcon);
    weatherDesc.innerHTML = `<p>Weather Condition: ${newDesc}<br>WindSpeed: ${windSpeed}mph<br>Humidity: ${humidity}%</p>`;
};