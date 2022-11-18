const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "//api.openweathermap.org/data/2.5/weather?id=936374&appid=d5897d892fdcc9e1e7610ad94239af0b&units=metric";

async function apiFetch() {
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

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    let newDesc = "";
    for (let i = 0; i < desc.length; i++) {
        if (desc[i-1] == " " || desc[i] == desc[0]) {
            newDesc += desc[i].toUpperCase();
        } else {
            newDesc += desc[i];
        }
    }

    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", newDesc);
    captionDesc.textContent = newDesc;
}

apiFetch();