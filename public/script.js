const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    //replace currnt display value only if 1st value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if current display value is 0 replace it - otherwise append digit
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    //if operator pressed don't add decimal
    if (awaitingNextValue) {
        return;
    }
    //if no decimal, append one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Calculato 1st and 2nd values depending on operator 
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    //prevent mulitple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    const currentValue = Number(calculatorDisplay.textContent);
    //Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        //console.log( firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        //console.log('calculation', calculation);
        firstValue = calculation;
    }
    //ready for next value store 
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
if(inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
} else if (inputBtn.classList.contains('operator')){
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
} else if (inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', () => addDecimal());
}
});

//reset all values 
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

// Event Listener for Clear button
clearBtn.addEventListener('click', resetAll);