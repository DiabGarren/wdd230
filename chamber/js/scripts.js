const date = new Date;
const year = date.getFullYear();
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full"
}).format(
    now
);

if (document.getElementById("year").innerHTML == null) {} else {
    document.getElementById("year").innerHTML = year;
    document.getElementById("updated").innerHTML = `Last updated ${document.lastModified}`;
    document.getElementById("date").innerHTML = fulldate;
}

const toggleMenu = () => {
    document.getElementById("primary_nav").classList.toggle("open");
    if (hamBtn.innerHTML == "☰" || hamBtn.innerHTML == "&#9776;") {
        hamBtn.innerHTML = "X";
    } else {
        hamBtn.innerHTML = "☰";
    }
}

const hamBtn = document.querySelector("#ham_btn");
hamBtn.addEventListener("click", toggleMenu);

const meeting = document.querySelector("#event");
if (meeting == null) {} else {
    if (now.getDay() == 1 || now.getDay() == 2) {
        meeting.innerHTML = "<h2>Wednesday Meeting!</h2><p>🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.</p>"
    }
}

const temp = document.querySelector("#temp");
if (temp == null) {} else {
    const windSpeed = document.querySelector("#wind-speed").textContent;
    const windChill = document.querySelector("#wind-chill");

    const calcWindChill = (temp, windSpeed) => {
        if (temp > 10 || windSpeed < 4.8) {
            return "N/A";
        } else {
            temp = (temp * 9 / 5) + 32;
            windSpeed = windSpeed / 1.609

            let windChill = 35.75 + 0.6215 * temp - 35.75 * windSpeed ** 0.16 + 0.4275 * temp * windSpeed ** 0.16
            windChill = (windChill - 32) * 5 / 9;
            return `${windChill.toFixed(2)}°C`;
        }
    }
    windChill.textContent = calcWindChill(temp.textContent, windSpeed);
}

let imagesToLoad = document.querySelectorAll("img[data-src]");
if (imagesToLoad == null) {} else {
    const loadImages = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.onload = () => {
            image.removeAttribute("data-src");
        };
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    observer.unobserve(item.target);
                }
            });
        });

        imagesToLoad.forEach((img) => {
            observer.observe(img);
        });

    } else {
        imagesToLoad.forEach((img) => {
            loadImages(img);
        });
    }
}

const visit = document.querySelector("#visit");
if (visit == null) {} else {
    let lastVisit = window.localStorage.getItem("lastVisitTime");

    if (lastVisit == null) {
        visit.textContent = "This is your first visit!";
    } else {
        visit.textContent = `${Math.round((Date.now() - lastVisit) / 86400000)} days`;
    }

    let visitTime = Date.now();

    localStorage.setItem("lastVisitTime", visitTime);
}

const formDate = document.querySelector("#form-date");
if (formDate == null) {} else {
    formDate.value = Date.now();
}

function displayBusinesses(business) {
    if (business.name == null) {} else {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let link = document.createElement("a");
        let img = document.createElement("img");

        name.textContent = business.name;

        address.textContent = business.address

        phone.textContent = business.phone;

        link.setAttribute("href", business.link);
        link.setAttribute("target", "_blank");
        link.textContent = business.link;

        img.setAttribute("src", business.imageurl);
        img.setAttribute("alt", business.name);
        img.setAttribute("loading", "lazy");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);

        document.querySelector("div.business-cards").appendChild(card);
    }
};

let bussinessCards = document.querySelector(".business-cards");
if (bussinessCards == null) {} else {
    let businessInfo = [];

    const getBusinessInfo = async () => {
        const response = await fetch("json/data.json");

        businessInfo = await response.json();

        displayBusinesses(businessInfo);
        businessInfo.forEach(displayBusinesses);
    }
    getBusinessInfo();
}