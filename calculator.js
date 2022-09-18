// create functions for each operator (add, subtract, divide, multiply)
// store the "display value" in a variable
//      can this be an array of the input, and then use the array.prototype.reduce() on it to operate through the items in the array??
// create a function called operate that takes an operator and 2 numbers and then calls one of the functions
// operate() on the numbers based upon the operator selected
//      only operate on 2 numbers at a time
// 

// INITIALIZE VARIABLES
const buttons = document.querySelectorAll('.button');
const operators = document.querySelectorAll('.operator');
const displayZone = document.querySelector('.display');
const equals = document.querySelector('.equals');
const numbers = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#clear');
const modifiers = document.querySelectorAll('.modifier');

// displayZone.maxLenght = 14;


let displayValue = "";
let previousValue = "";
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
    return parseFloat((num1 * num2).toFixed(10));
}

const divide = function divide(num1, num2) {
    if(num2 == 0){
        return 'Yeah, no.';
    } return parseFloat((num1 / num2).toFixed(12));
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
    previousValue = "";
    operatorValue = "";
    result = "";
    tempResult = "";
}

// DISPLAY VALUES

const display = function(string){
    displayZone.textContent = string
}

// MODIFY THE NUMBER

const changePercent = function(number) {
    if (typeof(number) == 'number') {
        return parseFloat((number/100).toFixed(12));
    } else if (typeof(number) == 'string') {
        return parseFloat((number/100).toFixed(12));
    }
}

// BUTTON CLICKS
/*
when a button is pressed, store the number as a string into a variable displayValue.
the number should concatenate together until an "operator" type button is clicked.
ex. click on 9, 2, 7, the number being stored in displayValue should be 927.
*/

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (displayValue.length < 14){
            if (displayValue == '0') {
                displayValue = ""
            } else if (result && !operatorValue) {
                result = "";
                previousValue = "";
            } else if (e.target.textContent === '.' && displayValue.includes('.')){
                return
            }
            displayValue = displayValue.concat(e.target.textContent);
            display((displayValue));
        }
    }) 
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) =>{
        if (previousValue && !result) {
            previousValue = operate(previousValue, displayValue, operatorValue);
            operatorValue = e.target.id;
            displayValue = '';
            display(previousValue);
        } else if (!result) {
            operatorValue = e.target.id;
            previousValue = displayValue;
            displayValue = '';
            display(e.target.textContent);
        } else {
            operatorValue = e.target.id;
            previousValue = result;
            displayValue = '';
            display(e.target.textContent);
        }
    })
})

equals.addEventListener('click', () => {
    previousValue = operate(previousValue, displayValue, operatorValue);
    result = previousValue;
    displayValue = "";
    operatorValue = "";
    if (previousValue > 9E13){
        display(previousValue.toExponential(4).toString());
    } else {
        display(result.toString());
    }
})

clearBtn.addEventListener('click', () => {
    clear();
    display(displayValue);
})

modifiers.forEach((modifier) => {
    modifier.addEventListener('click', (e) => {
        if(result) {
            displayValue = changePercent(result);
        }    
        displayValue = changePercent(displayValue);
        display(displayValue);
    })
})
        // if (result) {
        //     result = changePercent(result);
        //     display(result);
        //     previousValue = result;
        // } else {
        //     result = changePercent(displayValue)
        //     display(result);
        //     displayValue = result;
//         }
//     });
// })

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