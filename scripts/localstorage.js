// FIRST FUNCTION
const getLocalStorage = () => {
    // getting our values from local storage
    let localStorageData = localStorage.getItem("expensesArr");

    // we check if that data is null, is so we return an empty array
    if(localStorageData == null){
        return [];
    }

    // we return an array of local storage
    return JSON.parse(localStorageData);
};

const saveToLocalStorage = (expense) => {
    // expensesArr will get the current values in local storage
    // aka saves the array in expensesArr
    let expensesArr = getLocalStorage();

    // Find the index of the existing expense with the same name (**will return -1 if not found)
    const existingexpenseIndex = expensesArr.findIndex(existingexpense => existingexpense.name === expense.name);

    // If the expense already exists, update it; otherwise, add it to the expensesArr
    if (existingexpenseIndex !== -1) {
        // Replace the existing expense with the updated expense
        expensesArr[existingexpenseIndex] = expense;
    } else {
        // Add the new expense to the expensesArr
        expensesArr.push(expense);
    }

    // JSON.stringify insures whatever we save into local storage is a string
    localStorage.setItem("expensesArr", JSON.stringify(expensesArr));
};

const removeFromLocalStorage = (expense) => {
    // we're saving local storage data into expensesArr variable
    let expensesArr = getLocalStorage();

    // Find the index of the existing expense with the same name (**will return -1 if not found)
    const existingexpenseIndex = expensesArr.findIndex(existingexpense => existingexpense.name === expense.name);

    // remove the name from the array using the .splice method
    if(existingexpenseIndex !== -1){
        expensesArr.splice(existingexpenseIndex, 1);
    }

    // we set our new mutated expensesArr array inside our local storage
    localStorage.setItem("expensesArr", JSON.stringify(expensesArr));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };