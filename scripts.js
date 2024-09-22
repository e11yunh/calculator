function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    return operator(n1, n2);
};

function start_calculation(operator, n1, n2) {
    operate(operator, n1, n2);
};

function ready_calculator() {
    // Receive Input 
    operator_chosen = divide
    first_num = 0.2
    second_num = 0.1

    // Calculation Logic
    final_val = operate(operator_chosen, first_num, second_num);
    return final_val;
};

console.log(ready_calculator())

document.addEventListener('DOMContentLoaded', () => {
    ready_calculator()
    createButtonGrids();
})



function createButtonGrids() {
const buttonGrid = document.querySelector("#button-grid");
const n_buttons = 20;
const gapSize = 1; //  A gap of 1% is present between each div elem

const buttonWidth = ((1 / 4) * 100  - gapSize / (4/3)) // only 3 gaps will exist between 0 and 3
const buttonHeight = ((1 / 5) * 100 - gapSize / (4/3))


const buttonArr = ["C", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

for (let i = 0; i < n_buttons - 1; i++) {
    const buttonElem = document.createElement("div");
    buttonElem.classList.add("button-elem");
    buttonElem.setAttribute('id', `button-${i}`);
    buttonElem.style.height = buttonHeight + "%";
    buttonElem.textContent = buttonArr[i];

    if (i === 16) {
        buttonElem.style.width = (2 * buttonWidth) + 1 + "%" ; // to make it proportional to 100%
    } else buttonElem.style.width = buttonWidth + "%";
    
    
    buttonGrid.appendChild(buttonElem);
};

};