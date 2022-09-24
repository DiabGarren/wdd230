const footerContent = document.querySelector("#footer-content");
const date = new Date();
if(footerContent != null){
    footerContent.innerHTML = `&copy; ${date.getFullYear()} | Garren M. Diab | Last updated ${document.lastModified}`;
}
if(updated != null){
    updated.innerHTML = ``;
}