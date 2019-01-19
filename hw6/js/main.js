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

    document.getElementById("post").addEventListener("click", (ev)=>{
        ev.preventDefault();
        postData();
    });

    document.getElementById("put").addEventListener("click", (ev)=>{
        ev.preventDefault();
        putData();
    });
}

function putData() {
    let json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 20){
            alert(`${xhr.status}:${xhr.statusText}`);
        }
        else {
            console.log(xhr.responseText);
            clearAllField();
            getData();
        }

    };
}

function postData(){
    let textBoxes = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    let textValues = [];

    for (let i = 1; i < textBoxes.length; i++){
        if (textBoxes[i].value === ""){
            alert("You should fill all fields (besides id) to post data!");
            return;
        }
        textValues.push(textBoxes[i].value);
    }

    let user = new User(textValues);
    let jsonUser = JSON.stringify(user);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(jsonUser);

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 201){
            alert(`${xhr.status}:${xhr.statusText}`);
        }
        else {
            console.log(xhr.responseText);
            clearAllField();
            getData();
        }

    }
}

function clearAllField() {
    let textBoxes = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');

    for (let i = 0; i < textBoxes.length; i++){
        textBoxes[i].value = "";
    }
}

function User(args) {
    // this.id = args[0];
    this.name = args[1];
    this.username = args[2];
    this.email = args[3];
    this.address = {};
    this.address.street = args[4];
    this.phone = args[5];
    this.website = args[6];
    this.company ={};
    this.company.name = args[7];
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
    tempUrl = `${url}/${id}`;
    xhr.open('DELETE', tempUrl, true);
    xhr.send();

    xhr.onload = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200){
            alert(`${xhr.status}:${xhr.statusText}`);
            //console.log(xhr.responseText);
        }
        else {
            console.log(xhr.responseText);
            clearAllField();
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

    let inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
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

    if (tag === "td"){
        row.id = values[0];
        row.addEventListener("click", (ev)=>{
            // if (ev.target !== )
            // ev.preventDefault();
            onRowClick(row.id);
        });
    }

    return row;
}

function onRowClick(id) {
    let row = data.find((elem)=>{
        return elem.id == id;
    });

    document.getElementById("id").value = row.id;
    document.getElementById("name").value = row.name;
    document.getElementById("username").value = row.username;
    document.getElementById("email").value = row.email;
    document.getElementById("address").value = row.address.street;
    document.getElementById("phone").value = row.phone;
    document.getElementById("website").value = row.website;
    document.getElementById("company").value = row.company.name;
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
