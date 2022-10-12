const list = document.querySelector(".list");
const input = document.querySelector("#favchap");
const button = document.querySelector("#add-book");

button.addEventListener("click", () => {
    // set the value based on the input field
    const favchap = input.value;
    
    // if the input field was empty
    if (favchap == "") {
        // set focus on the input field
        input.focus();
    } else {
        // create a li item
        const nodeLi = document.createElement("li");
        // create a span item
        const nodeText = document.createElement("span");
        // create a button item
        let nodeButton = document.createElement("button");
        
        // add the text to the li item
        nodeLi.appendChild(nodeText);
        // set the text
        nodeText.textContent = favchap;
        // add the button to the li item
        nodeLi.appendChild(nodeButton);
        // set button text
        nodeButton.textContent = "❌";
                
        // add the li item to the list
        list.appendChild(nodeLi);
        
        // add an event listener to the new button
        nodeButton.addEventListener("click", function() {
            // remove the entire li item
            list.removeChild(nodeLi);
        });

        // clear the input and give it focus
        input.value = "";
        input.focus();
    }
});


