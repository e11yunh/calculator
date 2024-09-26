const maxNum = Number.MAX_SAFE_INTEGER;

function add(n1, n2) {
    return n1 + n2;
};

function subtract(n1, n2) {
    return n1 - n2;
};

function multiply(n1, n2) {
    return n1 * n2;
};

function divide(n1, n2) {
    return n1 / n2;
};

function operate(operator, n1, n2) {
    switch(operator){
        case '/':
            return divide(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
    }
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


document.addEventListener('DOMContentLoaded', () => {
    ready_calculator()
    createButtonGrids();
});



function createButtonGrids() {
const buttonGrid = document.querySelector("#button-grid");
const n_buttons = 20;
const gapSize = 1; //  A gap of 1% is present between each div elem

const buttonWidth = ((1 / 4) * 100  - gapSize / (4/3)) // only 3 gaps will exist between 0 and 3
const buttonHeight = ((1 / 5) * 100 - gapSize / (4/3))


const buttonArr = ["C", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

for (let i = 0; i < n_buttons - 1; i++) {
    const buttonElem = document.createElement("button");
    buttonElem.classList.add("button-elem");
    buttonElem.setAttribute('id', `button-${i}`);
    buttonElem.style.height = buttonHeight + "%";
    buttonElem.textContent = buttonArr[i];
    buttonElem.value = buttonArr[i];
    buttonElem.addEventListener("click", (event) => {
        console.log(`Value of Button Event: ${event.target.value} ${typeof event.target.value}`)
        handle_buttons(event.target.value);
        // const display_text = document.querySelector("#display-text")
        // display_text.textContent = `Displaying: ${event.target.value}`
    });
    buttonElem.addEventListener("mousedown", (event) => {
        buttonElem.classList.add("pressed");
    });
    buttonElem.addEventListener("mouseup", (event) => {
        setTimeout(function() {
            buttonElem.classList.remove("pressed")
        }, 80)
    })

    if (i === 16) {
        buttonElem.style.width = (2 * buttonWidth) + 1 + "%" ; // to make it proportional to 100%
    } else buttonElem.style.width = buttonWidth + "%";
    
    
    buttonGrid.appendChild(buttonElem);
};

};


// update_display should be called whenever a button is input; so always be called
function update_upper_display(val) {
    const display_text = document.querySelector("#upper-text");
    display_text.textContent = val;
};


// if an operator is not called, then the input number is assumed to be n1 and n2 for the case after.
// So operator can be a flag to distinguish both nums

let n1 = "";
let n2 = "";
let temp = ""
let operator;
let lastCommand = "";
let result = "";



function update_main_display(input) {
    const display_text = document.querySelector("#display-text")
    display_text.textContent = input;
};

function restart() {
    n1 = "";
    n2 = "";
    operator = undefined;
    result = ""
    lastCommand = "";
    update_main_display("0");
    update_upper_display("")
};

function evaluate() {
    result = +(operate(operator, parseFloat(n1), parseFloat(n2))).toFixed(5); // limit the number of decimals
    if (result === Infinity) { // Special message for division by zero error
        result = "Undefined Event"
        update_main_display(result)
        update_upper_display("Math Error")
        n1 = "";
        n2 = "";
        operator = undefined;
    } else {
        n1 = result;
        update_main_display(result);
        update_upper_display(result);
        temp = n2;
        n2 = "";
    }
};

function handle_buttons(input) {
    // This function should solely handle the logic surrounding button inputs; 
    // whether the button should be a n1, operator, or n2
    const operatorArr = ["/", "*", "-", "+"];

    if (input === "C") {
        restart();
    }

    else if (input === "+/-") {
        if (n1 !== "" && n2 == "") {
            n1 *= -1;
            update_main_display(n1);
        }
        else if (n2 !== "") {
            n2 *= -1;
            update_main_display(n2);
        }
    }

    else if (operatorArr.includes(input)) {
        if (n2 !== "" && typeof operator !== "undefined") {
            evaluate()
        }
        operator = input;
        n2 = "";
        update_main_display(input);
    } 

    else if (input === "=") {
        if (lastCommand === "=") {
            n2 = temp;
            evaluate()
        } else evaluate();

    }

    // Handling n1
    else if (n1 === "" || typeof operator === "undefined") {
        if (input === ".") {
            if (n1.includes(".")) {
                input = ""
            }; 
        };
        n1 += input;
        update_main_display(n1);
    }

    // Handling n2
    else if (n2 === "" || typeof operator !== "undefined") {
        if (input === ".") {
            if (n2.includes(".")) {
                input = ""
            }; 
        };
        n2 += input;
        update_main_display(n2);
    }
    lastCommand = input;
    console.log(`n1: ${n1}, n2: ${n2}, operator: ${operator}.`)
};

// Merge the two display together to create a bigger display
    // Add a CSS indicator that an operator is currently being selected 
    // Add an icon on the top left to show that an operator is being selected 
    // The upper display should be integrated to the top right in the following style:  A / B = C (LAST COMMAND )

    
// Limit the max number able to be displayed or computed
// Implement '.' decimal functionality 
// Add default behaviour for when incomplete sequence is done
// Add keyboard support