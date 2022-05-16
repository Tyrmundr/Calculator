"use strict"
//Globals
const keyPresses = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operatorPresses = ["+", "-", "/", "*"]

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
        if(((calculator.current === "" && calculator.previous === "") || (calculator.current === ".")) || (!calculator.current && calculator.previous !== "")) return;

        if((calculator.current !== "" || calculator.current !== ".")&& !calculator.previous) {
            calculator.previous = calculator.current;
            calculator.operator = typeof element === "string" ? element : element.target.innerText;
            calculator.current = "";
        }

        if(calculator.previous !== "" && calculator.current !== "." && calculator.current !== "") {
            calculator.previous = calculator.compute();
            calculator.current = "";
            calculator.operator = typeof element === "string" ? element : element.target.innerText;
        }

        updateUI();
    },
    
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


       if(result === Infinity || result === NaN) {
           alert("That's a no go, champ, you can't divide by 0! Try again, will you?");
       } else {
           return Number.isInteger(result) ? result : result.toFixed(2);
       }
    },

    deleteLastItem() {
        calculator.current = calculator.current.slice(0, -1);
        updateUI();
    }
    
}

//Non-object functions

function updateUI() {
    if(calculator.current === undefined) {
        calculator.current = "";
    }
    currentTextElement.innerText = calculator.current;
    previousTextElement.innerText = `${calculator.previous} ${calculator.operator}`;
}

function clearUI() {
    calculator.previous = "";
    calculator.operator = "";
    calculator.current = "";
    currentTextElement.innerText  = "";
    previousTextElement.innerText = "";
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

btnClear.addEventListener("click", clearUI);

btnDelete.addEventListener("click", calculator.deleteLastItem);

document.addEventListener("keydown", (e) => {
    if(keyPresses.includes(e.key)) {
        if(e.key === "." && calculator.current.includes(".")) return;

        calculator.current += e.key;

        updateUI();
    } else if(operatorPresses.includes(e.key)) {
        calculator.operate(e.key);
    } else if(e.key === "Delete") {
        clearUI();
    } else if(e.key === "Backspace") {
        calculator.deleteLastItem();
    } else if(e.key === "Enter") {
        if(calculator.current !== "" && calculator.previous !== "") {
            calculator.current = calculator.compute();
            calculator.operator = "";
            calculator.previous = "";
        }
        updateUI();
    }
})