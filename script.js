let budget = 0;
let expenses = []
let total = 0;

const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetDisplay = document.getElementById("budgetDisplay");

const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const errorMessage = document.getElementById("errorMessage");

const expensesList = document.getElementById("expensesList");
const totalDisplay = document.getElementById("totalDisplay");
const statusDisplay = document.getElementById("statusDisplay");


function setBudget() {
    const value  = Number(budgetInput.value);

    if(isNaN(value) || value <= 0){
        alert("Ingresa una meta valida mayor a 0");
        return;
    };
    
    budget = value;
    budgetDisplay.textContent = `Meta actual : $${budget}`;
    updateStatus();
}

function addExpense(){
    const amountValue = Number(amountInput.value);
    const categoryValue = categoryInput.value

    if(isNaN(amountValue) || amountValue <= 0){
        errorMessage.textContent = "El monto debe ser un numero mayor a 0"
        return;
    }

    if(!categoryValue){
        errorMessage.textContent = "selecciona una categoria"
        return;
    }

    errorMessage.textContent = ""

    const newExpense = {
        amount: amountValue,
        category: categoryValue
    };

    expenses.push(newExpense);

    amountInput.value = "";
    categoryInput.value = "";
    updateTotal();
    renderExpenses();
    updateStatus();
}

function updateTotal(){
    let sum = 0
    for (const expense of expenses){
        sum += expense.amount
    }
    total = sum

    totalDisplay.textContent = `Total Gastado: $${total}`
}

function renderExpenses(){
    expensesList.innerHTML = ""
    expenses.forEach((expense, index)=>{
        const li = document.createElement("li")
        li.textContent = `$${expense.amount} - ${expense.category}`;
        expensesList.appendChild(li);
    })

    
}

function updateStatus(){
    if(budget <= 0){
        statusDisplay.textContent = "Estado: sin meta definida";
        statusDisplay.className = "";
        return
    }

    if(total <= budget){
        statusDisplay.textContent = "Estado; dentro de la meta";
        statusDisplay.className = "status-ok";
    }else{
        statusDisplay.textContent = "Estado: sobrepasaste la meta"
        statusDisplay.className = "status-bad";
    }
}


function saveToLocalStorage(){
    const data = {
        budget: budget,
        expenses: expenses
    };

    localStorage.setItem("gastosApp", JSON.stringify(data));
}

function loadFromLocalStorage(){
    const save = localStorage.getItem("gastosApp");
    if(!save) return;

    const data = JSON.parse(save);
    budget = data.budget || 0;
    expenses = data.expenses ||[];

    budgetDisplay.textContent = `Meta actaul: $${budget}`;
    renderExpenses();
    updateStatus();
    updateTotal();
}

setBudgetBtn.addEventListener("click", () => {
  setBudget();
})

addExpenseBtn.addEventListener("click", () =>{
    addExpense();
})

window.addEventListener("load", () =>{
    loadFromLocalStorage();
})