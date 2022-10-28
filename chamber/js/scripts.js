const date = new Date;
const year = date.getFullYear();
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full"
}).format(
    now
);

if (document.getElementById("year").innerHTML != null) {
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
if (now.getDay() == 1 || now.getDay() == 2) {
    meeting.innerHTML = "<h2>Wednesday Meeting!</h2><p>🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.</p>"
}

if (document.querySelector("#temp") == null) {} else {
    const temp = document.querySelector("#temp").textContent;
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

    windChill.textContent = calcWindChill(temp, windSpeed);
}

if (document.querySelector("img[data-src]") == null) {} else {
    let imagesToLoad = document.querySelectorAll("img[data-src]");
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

let lastVisit = window.localStorage.getItem("lastVisitTime");

if (lastVisit == null) {
    visit.textContent = "This is your first visit!";
    console.log()
} else {
    visit.textContent = Math.round((Date.now() - lastVisit) / 86400000);
}

let visitTime = Date.now();

localStorage.setItem("lastVisitTime", visitTime);