"use strict"

//DOM
const btnEquals = document.querySelector(".btn-equals");
const btnDelete =document.querySelector(".btn-delete");
const btnClear = document.querySelector(".btn-clear");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const previousTextElement = document.querySelector(".previous");
const currentTextElement = document.querySelector(".current");

//Object instance
const calculator = {
    current: "",
    previous: "",
    operator: "",

    append(element) {
        if(element.target.innerText === "." && calculator.current.includes(".")) return;

        calculator.current += element.target.innerText;

        updateUI();
    },

    operate(element) {
        if(calculator.current === "") return;

        if(calculator.previous === "") {
            calculator.previous = calculator.current;
            calculator.current = "";
            calculator.operator = element.target.innerText;
        }

        calculator.compute();
        calculator.operator = element.target.innerText;
        updateUI();
    },

    /*
    delete() {
        //code
    },
    */

    
    compute() {
        let result;
        let prev = Number(this.previous);
        let curr = Number(this.current);
        switch(this.operator) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "/":
                result = prev / curr;
                break;
            case "*":
                result = prev * curr;
                break;
            default:
                alert("No operator was chosen, cannot calculate!");
        }
        if(Number.isInteger(result)) {
            calculator.previous = result;
        } else {
            calculator.previous = Number(result.toFixed(2));
        }
        calculator.current = "";
    }
    
}

//Non-object functions

function updateUI() {
    currentTextElement.innerText = calculator.current;
    previousTextElement.innerText = `${calculator.previous} ${calculator.operator}`;
}

//Event listeners
numbers.forEach(number => number.addEventListener("click", calculator.append));

operators.forEach(operator => operator.addEventListener("click", calculator.operate));