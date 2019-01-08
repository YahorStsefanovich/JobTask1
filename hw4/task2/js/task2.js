const url = "http://www.google.by";

window.onload = init;

function init() {
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");

    btn1.onclick = function(ev){
        ev.preventDefault();
        redirectToAnotherPage(url);
    };
    btn2.addEventListener("click", drawLayout);
}

function redirectToAnotherPage(url) {
    document.location.href = url;
}

function drawLayout() {
    document.body.innerHTML = "";
    let container = createDiv("", "flex-container");

    for (let i = 0; i < Math.round(Math.random() * 10 + 1); i++)
    {
        container.appendChild(createDiv(i));
    }

    document.body.appendChild(container);
}

function createDiv(innerHTML, className) {
    let div = document.createElement("div");
    div.innerHTML = innerHTML;

    if (className !== undefined){
        div.className = className;
    }

    return div;
}