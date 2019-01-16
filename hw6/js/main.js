let url = "http://jsonplaceholder.typicode.com/YegorSvelogorskiy/JobTask1/users";

window.onload = init;

function init() {
    // getData();
    document.getElementById("get").addEventListener("click", (ev)=>{
        ev.preventDefault();
        getData();
    });
}

function getData() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', getUrl(), true);
    xhr.send();

    xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200){
            alert(`${xhr.status}:${xhr.statusText}`);
        }
        else {
            console.log(xhr.responseText);
        }

    }
}

function getValueFromInput(id) {
    return document.getElementById(id).value;
}

function getUrl() {
    let resultUrl = url;

    let inputs = document.querySelectorAll("input[type=text]");
    let filter = "";
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value !== ""){
            if (filter !== ""){
                filter += "&"
            }
            filter += `${inputs[i].name}=${inputs[i].value}`;
        }
    }

    if (filter !== ""){
        resultUrl += `?${filter}`;
    }

    return resultUrl;
}