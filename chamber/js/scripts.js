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

function toggleMenu() {
    document.getElementById("primary_nav").classList.toggle("open");
    if (hamBtn.innerHTML == "☰" || hamBtn.innerHTML == "&#9776;") {
        hamBtn.innerHTML = "X";
    } else {
        hamBtn.innerHTML = "☰";
    }
}

const hamBtn = document.querySelector("#ham_btn");
hamBtn.addEventListener("click", toggleMenu);