let itemValue = "computer";

document.addEventListener('DOMContentLoaded',function() {
    let elem = document.getElementsByName("computerType")[0];
    elem.addEventListener("change", changeForm);

    document.getElementById("sendBtn").onclick = function(ev){
        ev.preventDefault();
        getValuesFromInputs();
    };
}, false);

function changeForm() {
    let elem = document.getElementsByName("computerType")[0];
    itemValue = elem.options[elem.selectedIndex].value;
    switch (itemValue){
        case "computer":
            changeDiplayMode("computingServer", false);
            changeDiplayMode("ultrabook", false);
            break;
        case "ultrabook":
            changeDiplayMode("computingServer", false);
            changeDiplayMode("ultrabook", true);
            break;
        case "computingServer":
            changeDiplayMode("computingServer", true);
            changeDiplayMode("ultrabook", false);
            break;
    }
}

function changeDiplayMode(className, isVisible) {
    let displayMode = (isVisible? "flex" : "none");
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++){
        elements[i].style.setProperty("display", displayMode);
    }
}

function getValuesFromInputs() {
    let result = "";

    let processorType = document.getElementById("processorType").value;
    let coresCount = document.getElementById("coresCount").value;
    let frequency = document.getElementById("frequency").value;
    let bitDepth = document.getElementById("bitDepth").value;

    switch (itemValue){
        case "computer":
            result = serialize(new Computer(processorType, coresCount, frequency, bitDepth));
            break;
        case "ultrabook":
            let graphicsCard = document.getElementById("graphicsCard").value;
            let ramSize = document.getElementById("ramSize").value;
            result = serialize(new Ultrabook(processorType, coresCount, frequency, bitDepth, graphicsCard, ramSize));
            break;
        case "computingServer":
            let isHiperThreading = Boolean(document.getElementById("isHiperThreading").value);
            let hddSize = document.getElementById("hddSize").value;
            result = serialize(new Ultrabook(processorType, coresCount, frequency, bitDepth, isHiperThreading, hddSize));
            break;
    }

    console.log(result);
    return result;
}