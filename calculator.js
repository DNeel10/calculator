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

// DEPENDING ON WHICH OPERATOR IS SELECTED, USE A DIFFERENT CALCULATION
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

// CLEAR THE CALCULATOR AND RESET SO YOU CAN START OVER
let clear = function() {
    displayValue = "0";
    tempValue = "";
    operatorValue = "";
    result = "";
    tempResult = "";
}

// DISPLAY VALUES

const display = function(string){
    displayZone.textContent = string;
}

// MODIFY THE NUMBER

const modify = function(number, string) {
    if (string == 'percent') {
        return parseInt(number)/100;
    } else if (string == 'decimal') {
        if (displayValue == "") {
            return "." ;
        } else {
            return number + ".";
        }   
    } else if (string =='negative') {
        if( displayValue == "") {
            return "-"
        } else if (result) {
            return "-" + number.toString();
        } else {
            return `-${number}`;
        }
    }
}

// BUTTON CLICKS
/*
when a button is pressed, store the number as a string into a variable displayValue.
the number should concatenate together until an "operator" type button is clicked.
ex. click on 9, 2, 7, the number being stored in displayValue should be 927.
*/
for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('number')) {
        buttons[i].addEventListener('click', (e) => {
            if (displayValue.length < 14){
                if (displayValue == '0') {
                    displayValue = ""
                } else if (result && !operatorValue) {
                    result = "";
                    tempValue = "";
                }
                displayValue = displayValue.concat(e.target.textContent);
                display((displayValue));
                console.log(displayValue.length);
            }
        });
    } else if (buttons[i].classList.contains('operator')) {
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
    } else if (buttons[i].classList.contains('equals')) {
        buttons[i].addEventListener('click', () => {
            tempValue = operate(tempValue, displayValue, operatorValue);
            result = tempValue;
            displayValue = "";
            operatorValue = "";
            if (tempValue > 9E14){
                display(tempValue.toExponential(4).toString());
            } else {
                display(tempValue.toString());
            }

        });
    } else if (buttons[i].classList.contains('clear')) {
        buttons[i].addEventListener('click', () => {
                clear();
                display(displayValue);
            })
    } else if (buttons[i].classList.contains('modifier')) {
        buttons[i].addEventListener('click', (e) => {
            if (result) {
                result = modify(tempValue, e.target.id);
                display(result);
                displayValue = result;

            } else {
                result = modify(displayValue, e.target.id);
                display(result);
                displayValue = result;
            }
        });
    };
}

//ADD HOVER EFFECT

buttons.forEach((button) => {
    button.addEventListener('mouseenter', (e) => {
        e.target.style.border = '2px solid orange';
    });
});

buttons.forEach((button) => {
    button.addEventListener('mouseleave', (e) => {
        e.target.style.border = '';
    });
});

//BUG - SOLVED
/*
decimal currently only edits a number that is already displayed, and isn't able to be used prior to inputting other numbers
press 3 then . and you get 0.3
should be able to press . first and then any number after it to create the decimal
*/

//BUG - SOLVED
/*
modifying a number shows the correct result ,but operating on the new modified number treats it as the previous number:
ex. 3 + 3 = 6
    modifying it with a % gives the result 0.06 (this is correct)
    multiplying 0.06 by 100 should give me 6 again (expected Result) actual result is:
    0.06 * 100 = 600 (the operation is treating the 0.06 still as 6)
*/

//BUG - SOLVED
/* 
after getting a result, i can't currently start a new calculation with 2 brand new numbers.  the calculation continues with the "result" of the previous calculation even if i select 2 new numbers.
ex. 2 + 3 = 5
    7 + 9 = 16 is the expected result, actual result is:
    5 + 9 = 14.  the 5 is carrying over
*/