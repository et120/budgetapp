import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// IDs
let budgetLeft = document.getElementById("budgetLeft");

let budgetInitial = document.getElementById("budgetInitial");
let expensesDiv = document.getElementById("expensesDiv");

// Modal IDs
let updateBudgetModalBtn = document.getElementById("updateBudgetModalBtn");
// let manageExpensesModalBtn = document.getElementById("manageExpensesModalBtn");
let addExpenseModalBtn = document.getElementById("addExpenseModalBtn");

let inputUpdateBudget = document.getElementById("inputUpdateBudget");
let expensesModalDiv = document.getElementById("expensesModalDiv");
let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");

// JavaScript Global
let budgetAmount = 0;

// Creating Expenses Elements (PAGE)
function createExpense(expense) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("row", "text-center", "pb-2");

    let nameDiv = document.createElement('div');
    nameDiv.classList.add("col-6");

    let amountDiv = document.createElement('div');
    amountDiv.classList.add("col-6");

    let p = document.createElement('p');
    p.textContent = expense.name;

    let p2 = document.createElement('p');
    p2.textContent = "-" + expense.amount;

    nameDiv.appendChild(p);
    amountDiv.appendChild(p2);
    rowDiv.append(nameDiv, amountDiv);
    expensesDiv.appendChild(rowDiv);
}

// Creating Expenses Elements (MODAL)
function createExpenseModal(expense) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("row", "text-center");

    let nameDiv = document.createElement('div');
    nameDiv.classList.add("col-6");

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add("col-6");

    let p = document.createElement('p');
    p.textContent = expense.name;

    let button = document.createElement('button');
    button.innerHTML = "Remove"
    button.classList.add("btn", "btn-primary", "btn-sm");

    nameDiv.appendChild(p);
    buttonDiv.appendChild(button);
    rowDiv.append(nameDiv, buttonDiv);
    expensesModalDiv.appendChild(rowDiv);

    button.addEventListener('click', () => {
        removeFromLocalStorage(expense);
        populate();
    });
}

// Populate Page Function
function populate() {
    // this retrieves our data from local storage and stores it into favorites variable
    let expensesArr = getLocalStorage();

    // clears div so the array displayed will not constantly repeat    
    expensesDiv.innerHTML = "";
    expensesModalDiv.innerHTML = "";

    // forEach through each element in our array & find budget
    expensesArr.forEach(expense => {
        if ('budget' in expense) {
            budgetAmount = expense.budget;
            budgetInitial.textContent = budgetAmount;
        }
    });
    
    let budgetRemain = parseFloat(budgetAmount);

    // Now, create expenses
    expensesArr.forEach(expense => {
        if (!('budget' in expense)) {
            createExpense(expense);
            createExpenseModal(expense);
            budgetRemain -= expense.amount;
        }
    });

    budgetLeft.textContent = budgetRemain.toFixed(2);
}

// Onload
window.addEventListener('load', function () {
    populate();
});

// Update Budget
updateBudgetModalBtn.addEventListener('click', () => {
    const inputValue = parseFloat(inputUpdateBudget.value);

    if (inputValue) {
        budgetAmount = inputValue.toFixed(2);

        saveToLocalStorage({
            budget: budgetAmount
        });

        populate();
    }
});

// Add Expense
addExpenseModalBtn.addEventListener('click', () => {
    const inputName = expenseName.value;

    const inputValue = parseFloat(expenseAmount.value);

    if (inputName && inputValue) {
        saveToLocalStorage({
            name: inputName,
            amount: inputValue.toFixed(2)
        });

        populate();
    }
});

// Input Field Limit
inputUpdateBudget.oninput = function () {
    if (this.value.length > 8) {
        this.value = this.value.slice(0, 8); 
    }
}

expenseAmount.oninput = function () {
    if (this.value.length > 8) {
        this.value = this.value.slice(0, 8); 
    }
}