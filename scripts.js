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
            break;
        case '*':
            return multiply(n1, n2);
            break;
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
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
})



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


// if button is '=', only then shall the operate function be called

// return operate(operator, n1, n2);


// update_display should be called whenever a button is input; so always be called
function update_upper_display(val) {
    const display_text = document.querySelector("#upper-text");
    display_text.textContent = val;
}


// if an operator is not called, then the input number is assumed to be n1 and n2 for the case after.
// So operator can be a flag to distinguish both nums

let n1 = "";
let n2 = "";
let operator;

function isButtonsPopulated() {
    return (typeof n1)
}

function update_main_display(input) {
    const display_text = document.querySelector("#display-text")
    display_text.textContent = input;
}

function restart() {
    // let n1 = "";
    // let n2 = "";
    // let operator;
    // update_main_display("0");
    // update_upper_display("")
    location.reload();
}

function handle_buttons(input) {
    // This function should solely handle the logic surrounding button inputs; 
    // whether the button should be a n1, operator, or n2
    const operatorArr = ["/", "*", "-", "+"];

    update_upper_display(input);
    if (input === "C") {
        restart();
    }

    else if (input === "+/-") {
        if (typeof operator === "undefined") {
            n1 *= -1;
            update_main_display(n1);
        }
        else if (typeof operator !== "undefined") {
            n2 *= -1;
            update_main_display(n2);
        };
    }

    else if (operatorArr.includes(input)) {
        operator = input;
        n2 = "";
        update_main_display(input);
    } 

    else if (input === "=") {
        let final_val = operate(operator, parseInt(n1), parseInt(n2));
        n1 = final_val;
        update_main_display(final_val);
    }
    else if (n1 === "" || typeof operator === "undefined") {
        n1 += input;
        update_main_display(n1);
    }
    else if (n2 === "" || typeof operator !== "undefined") {
        n2 += input;
        update_main_display(n2);
    }
    console.log(`n1: ${n1}, n2: ${n2}, operator: ${operator}.`)
};
