let url = "http://jsonplaceholder.typicode.com/YegorSvelogorskiy/JobTask1/users";

window.onload = init;

function init() {
    document.getElementById("get").addEventListener("click", (ev)=>{
        ev.preventDefault();
        getData();
    });
}

function getData() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', getUrl(), true);
    xhr.send();

    xhr.onreadystatechange = function() { 
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200){
            alert(`${xhr.status}:${xhr.statusText}`);
        }
        else {
            console.log(JSON.parse(xhr.responseText));
            showData(JSON.parse(xhr.responseText));
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

function showData(data) {
    if (data !== []){
        let table = document.createElement("table");
        table.className = "table-striped";

        //append header row
        let head = document.createElement("thead");
        head.appendChild(createRow("th", ["ID", "Name", "Username", "Email", "Address", "Phone", "Website", "Company"]));

        //append data rows
        let body = document.createElement("tbody");
        for (let i =0; i < data.length; i++){
            let row = createRow("td", [
                data[i].id,
                data[i].name,
                data[i].username,
                data[i].email,
                data[i].address.street,
                data[i].phone,
                data[i].website,
                data[i].company.name,
            ]);
            body.appendChild(row);
        }

        table.appendChild(head);
        table.appendChild(body);

        document.getElementsByClassName('container')[0].appendChild(table);
    }
}

function createRow(tag, values) {
    let row = document.createElement("tr");

    for (let i=0; i<values.length; i++){
        let column = document.createElement(tag);
        column.innerHTML =  values[i];
        row.appendChild(column);
    }

    return row;
}