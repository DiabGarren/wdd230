const requestURL = "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";
const cards = document.querySelector(".cards");

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const prophets = jsonObject['prophets'];
        prophets.forEach(displayProphets);
    });

function displayProphets(prophet) {
    let card = document.createElement("section");
    let h2 = document.createElement("h2");
    let dob = document.createElement("p");
    let birthPlace = document.createElement("p");
    let portrait = document.createElement("img");

    h2.textContent = `${prophet.name} ${prophet.lastname}`;

    dob.textContent = `Date of Birth: ${prophet.birthdate}`;

    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute("loading", "lazy");

    card.appendChild(h2);
    card.appendChild(dob);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    document.querySelector("div.cards").appendChild(card);
}