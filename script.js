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
        if((!calculator.current && !calculator.previous) || (!calculator.current && calculator.previous !== "")) return;

        if(calculator.current !== "" && !calculator.previous) {
            calculator.previous = calculator.current;
            calculator.operator = element.target.innerText;
            calculator.current = "";
        }

        if(calculator.previous !== "" && calculator.current !== "") {
            calculator.previous = calculator.compute();
            calculator.current = "";
            calculator.operator = element.target.innerText;
        }

        updateUI();
    },

    /*
    delete() {
        //code
    },
    */

    
    compute() {
       let op = this.operator;
       let prev = parseFloat(this.previous);
       let curr = parseFloat(this.current);
       let result;

       switch(op) {
           case "+":
               result = prev + curr;
               break;
            case "-":
               result = prev - curr;
               break;
            case "*":
               result = prev * curr;
               break;
            case "/":
                result = prev / curr;
                break;
       }


       console.log(`Result is: ${result}`);
       return result;
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

btnEquals.addEventListener("click", () => {
    if(calculator.current !== "" && calculator.previous !== "") {
        calculator.current = calculator.compute();
        calculator.operator = "";
        calculator.previous = "";
    }
    updateUI();
});