const footerContent = document.querySelector("#footer-content");
const updated = document.querySelector("#updated");
const date = new Date();
if(footerContent != null){
    footerContent.innerHTML = `&copy; ${date.getFullYear()} .:|:. Garren M. Diab .:|:. Gauteng`;
}
if(updated != null){
    updated.innerHTML = `Last updated ${document.lastModified}`;
}