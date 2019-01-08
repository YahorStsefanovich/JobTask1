const title = "Input name: ";
const defaultName = "User" + Math.round(Math.random() * 1000);

window.onload = init;

function init(){
    let result = prompt(title, defaultName);

    if (isStringContainsNumbers(result)){
        result = changeRegister(result);
    } else {
        result = reverseString(result);
    }

    alert(result);
}

function isStringContainsNumbers(str) {
    return str.search('//d/');
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function changeRegister(str){

    let result = [];
    str.split('').forEach((char)=>{
        if (char === char.toUpperCase()){
            result.push(char.toLowerCase());
        } else{
            result.push(char.toUpperCase());
        }
    });

    return result.join("");
}