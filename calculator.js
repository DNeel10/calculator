// create functions for each operator (add, subtract, divide, multiply)
// store the "display value" in a variable
//      can this be an array of the input, and then use the array.prototype.reduce() on it to operate through the items in the array??
// create a function called operate that takes an operator and 2 numbers and then calls one of the functions
// operate() on the numbers based upon the operator selected
//      only operate on 2 numbers at a time
// 

// INITIALIZE VARIABLES
const buttons = document.querySelectorAll('.button');
const operator = document.querySelectorAll('.operator');
const displayZone = document.querySelector('.display');
const equals = document.querySelector('.equals');


let displayValue = "";
let tempValue = "";
let operatorValue = "";
let result = "";
let tempResult = "";



// OPERATIONS

let add = function add(num1, num2){
    return Number(num1) + Number(num2);
}

const subtract = function subtract(num1, num2){
    return num1 - num2
}

const multiply = function multiply(num1, num2){
    return num1 * num2
}

const divide = function divide(num1, num2) {
    if(num2 == 0){
        return 'yeah, no';
    }return num1 / num2
}

let operate = function(num1, num2, op) {
    if (op == 'add') {
        return add(num1, num2);
    } else if(op == 'subtract'){
        return subtract(num1, num2);
    } else if(op == 'multiply'){
        return multiply(num1, num2);
    } else if(op == 'divide') {
        return divide(num1, num2);
    }
}

let clear = function() {
    displayValue = "0";
    tempValue = "";
    operatorValue = "";
    result = "";
    tempResult = "";
}

// DISPLAY

const display = function(string){
    displayZone.textContent = string;
}

// BUTTON CLICKS
/*
when a button is pressed, store the number as a string into a variable displayValue.
the number should concatenate together until an "operator" type button is clicked.
ex. click on 9, 2, 7, the number being stored in displayValue should be 927.
*/
for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('number')){
        buttons[i].addEventListener('click', (e) => {
            if (displayValue == '0') {
                displayValue = ""
            }
            displayValue = displayValue.concat(e.target.textContent);
            display((displayValue));
        });
    } else if (buttons[i].classList.contains('operator')){
        buttons[i].addEventListener('click', (e) =>{
            if (!result) {
                tempValue = displayValue;
                operatorValue = e.target.id;
                displayValue = ""
                display(e.target.textContent);  
            }  else {
                tempValue = result;
                operatorValue = e.target.id;
                displayValue = "";
                display(e.target.textContent);
            }
        });
    } else if (buttons[i].classList.contains('equals')){
        buttons[i].addEventListener('click', () => {
            tempValue = operate(tempValue, displayValue, operatorValue).toString();
            result = tempValue;
            displayValue = "";
            display(tempValue);
        });
    } else if (buttons[i].classList.contains('clear')){
        buttons[i].addEventListener('click', () => {
                clear();
                display(displayValue);
            })
    };
}

//BUG
/* 
after getting a result, i can't currently start a new calculation with 2 brand new numbers.  the calculation continues with the "result" of the previous calculation even if i select 2 new numbers.
ex. 2 + 3 = 5
    7 + 9 = 16 is the expected result, actual result is:
    5 + 9 = 14.  the 5 is carrying over
*/