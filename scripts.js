const maxChar = 15; // corresponds to display limit

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
    if (input === "∞ and beyond") {
        display_text.classList.add("gradient-text")
    } else {
        display_text.classList.remove("gradient-text")
    }
};

function reset_font_size() {
    const mainDisplay = document.querySelector("#display-text")
    mainDisplay.style.fontSize = '2rem'
    
    const upperDisplay = document.querySelector("#upper-text")
    upperDisplay.style.fontSize = '1rem'
}

function restart() {
    n1 = "";
    n2 = "";
    operator = undefined;
    result = ""
    lastCommand = "";
    update_main_display("0");
    update_upper_display("")
    reset_font_size();
    toggleIcons("");
};

function evaluate() {
    result = +(operate(operator, parseFloat(n1), parseFloat(n2))).toFixed(5); // limit the number of decimals
    if (result === Infinity) { // Special message for division by zero error
        result = "∞ and beyond"
        update_main_display(result)
        update_upper_display("Math Error")
        n1 = "";
        n2 = "";
        operator = undefined;
    } else {
        if (result.toString().length > maxChar) {
            const mainDisplay = document.querySelector("#display-text")
            mainDisplay.style.fontSize = '1.45rem'
            
            const upperDisplay = document.querySelector("#upper-text")
            upperDisplay.style.fontSize = '0.85rem'
        } else {
            reset_font_size()
        }
        update_upper_display(`${n1} ${operator} ${n2}`);
        n1 = result;
        update_main_display(result);
        temp = n2;
        n2 = "";
    }
};

function toggleIcons(operation) {
    const operator_container = document.querySelector("#operator-container")
    for (let child of operator_container.children) {
        if (child.getAttribute("value") === operation) {
            console.log(child.value)
            child.style.visibility = "visible"
            child.classList.add("blink")
        } else {
            child.style.visibility = "hidden"
            child.classList.remove("blink")
        }
    }
}

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
        if (n2 !== "" && typeof operator !== "undefined") { // handling "=" chaining
            evaluate()
        }
        operator = input;
        n2 = "";
        toggleIcons(input)
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
        if (n1.length <= maxChar) {
            n1 += input;
            update_main_display(n1);

        };
    }

    // Handling n2
    else if (n2 === "" || typeof operator !== "undefined") {
        if (input === ".") {
            if (n2.includes(".")) {
                input = ""
            }; 
        };
        if (n2.length <= maxChar) {
            n2 += input;
            update_main_display(n2);

        };
    }
    lastCommand = input;
    console.log(`n1: ${n1}, n2: ${n2}, operator: ${operator}.`)
};


// Change the '%' function to a backspace function    
// Add default behaviour for when incomplete sequence is done
// Add keyboard support
// NaN handle cases: Incomplete input results in NaN which will cause all subsequent results to be NaN regardless