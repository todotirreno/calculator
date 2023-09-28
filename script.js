function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(a, b) {
  return a ** b;
}

function root(a, b = 2) {
  return Math.sqrt(a);
}

function operate(op, a, b) {
  return operations[op](a, b);
}
const operations = { add, subtract, multiply, divide, power, root };

const calculator = document.querySelector("main");
const display = document.getElementById("display");
const equal = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

calculator.addEventListener("click", populateDisplay);
calculator.addEventListener("click", nextOperand);
equal.addEventListener("click", getResult);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", backspace);
// window.addEventListener("keyup", trigger);

const keyboard = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  dot: ".",
};

let noInput = true;
const operation = {};
let wait = false;

function populateDisplay(e) {
  if (!e.target.classList.contains("number")) return;
  if (display.textContent.match(/\./) && e.target.id === "dot") return;
  if (noInput) {
    display.textContent = "";
    noInput = false;
    if (e.target.id === "dot") display.textContent += 0;
  }
  display.textContent += keyboard[e.target.id];
}

function nextOperand(e) {
  if (!e.target.classList.contains("op")) return;
  // if (e.target.id === "root") {
  //   result = operate(operation.op, operation.a, 2);
  //   display.textContent = result;
  //   operation.a = result;
  //   operation.b = undefined;
  //   wait = true;
  //   noInput = true;
  //   return;
  // }
  if ((operation.a && !wait) || e.target.id === "root") {
    if (e.target.id === "root") {
      operation.op = e.target.id;
      operation.a = +display.textContent;
      operation.b = 2;
    } else operation.b = +display.textContent;
    getResult();
  }
  operation.op = e.target.id;
  operation.a = +display.textContent;
  noInput = true;
  wait = false;
}

function getResult() {
  operation.b = +display.textContent;
  result = operate(operation.op, operation.a, operation.b);
  display.textContent = result;
  operation.a = result;
  operation.b = undefined;
  wait = true;
  noInput = true;
}

function clear() {
  display.textContent = 0;
  noInput = true;
}

function backspace() {
  if (display.textContent === "0") return;
  if (display.textContent.length === 1) {
    display.textContent = 0;
    noInput = true;
  } else display.textContent = display.textContent.slice(0, -1);
}
