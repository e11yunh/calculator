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

// document.addEventListener('DOMContentLoaded', () => {
//     ready_calculator();
// })
