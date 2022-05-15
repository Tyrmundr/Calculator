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

        calculator.previous = calculator.current;
        calculator.current = "";
        calculator.operator = element.target.innerText;

        updateUI();
    }

    /*
    delete() {
        //code
    },
    */

    /*
    compute() {
        let result;
        switch(this.operator) {
            case "+":
                result = this.previous + this.current;
                break;
            case "-":
                result = this.previous - this.current;
                break;
            case "/":
                result = this.previous / this.current;
                break;
            case "*":
                result = this.previous * this.current;
                break;
            default:
                alert("No operator was chosen, cannot calculate!");
        }
        return result;
    }
    */
}

//Non-object functions

function updateUI() {
    currentTextElement.innerText = calculator.current;
    previousTextElement.innerText = `${calculator.previous} ${calculator.operator}`;
}

//Event listeners
numbers.forEach(number => number.addEventListener("click", calculator.append));

operators.forEach(operator => operator.addEventListener("click", calculator.operate));