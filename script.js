"use strict";

const resultUp = document.querySelector(".resultUp");
const resultDown = document.querySelector(".resultDown");
const numberButtons = document.querySelectorAll(".gridDiv .value");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

class Calculator {
  constructor(resultUp, resultDown) {
    this.resultUp = resultUp;
    this.resultDown = resultDown;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.operate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  operate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        if (current === 0) {
          alert("Can't divide by 0!");
          this.clear();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.resultDown.textContent = this.currentOperand;
    this.resultUp.textContent = this.previousOperand
      ? `${this.previousOperand} ${this.operation || ""}`
      : "";
  }
}

const calculator = new Calculator(resultUp, resultDown);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (["+", "-", "*", "/"].includes(value)) {
      calculator.chooseOperation(value);
    } else if (value === "=") {
      calculator.operate();
    } else {
      calculator.appendNumber(value);
    }
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});
