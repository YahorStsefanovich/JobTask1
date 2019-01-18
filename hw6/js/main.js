// let url = "http://jsonplaceholder.typicode.com/YegorSvelogorskiy/JobTask1/users";
let url = "http://localhost:3000/users";
// let url = "http://jsonplaceholder.typicode.com/users";
let data = [];

window.onload = init;

function init() {
    document.getElementById("get").addEventListener("click", (ev)=>{
        ev.preventDefault();
        getData();
    });

    document.getElementById("delete").addEventListener("click", (ev)=>{
        ev.preventDefault();
        deleteData();
    });
}

function deleteData() {
    let checkBoxes = document.querySelectorAll('input[type="checkbox"]');

    for (let index = 1; index < checkBoxes.length; index++){
        if (checkBoxes[index].checked){
            deleteRow(data[index - 1].id);
        }
    }
}

function deleteRow(id) {
    let xhr = new XMLHttpRequest();
    // tempUrl = `${url}?id=${id}`;
    tempUrl = `${url}/${id}`;
    xhr.open('DELETE', tempUrl, true);
    xhr.send();

    xhr.onload = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status != 200){
            alert(`${xhr.status}:${xhr.statusText}`);
            //console.log(xhr.responseText);
        }
        else {
            console.log(xhr.responseText);
            getData();
        }

    }
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
            data = JSON.parse(xhr.responseText);
            console.log(data);
            showData(data);
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

function removeTable() {
    let tables = document.querySelectorAll("table");
    if (tables.length){
        tables[0].remove();
    }
}

function showData(data) {
    if (data.length !== 0){
        removeTable();
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
        createCheckboxes();

        document.getElementById("delete").style.visibility = "visible";
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

//checkboxes for data removing
function createCheckboxes() {
    let rows = document.querySelectorAll("tr");

    //head checkBox for multiple selection
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', "checkbox");
    checkbox.id = "selectAll";
    checkbox.value = "selectAll";
    checkbox.addEventListener( 'change', function() {
        let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
        if(this.checked) {
            for (let index = 1; index < checkBoxes.length; index++){
                checkBoxes[index].checked = true;
            }
        } else {
            for (let index = 1; index < checkBoxes.length; index++){
                checkBoxes[index].checked = false;
            }
        }
    });

    rows[0].appendChild(checkbox);

    for (let index = 1; index < rows.length; index++){
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', "checkbox");
        checkbox.id = data[index - 1].id;
        rows[index].appendChild(checkbox);
    }
}
