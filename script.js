const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransaction = [
//     {id:1, text:'Flower', amount: -20},
//     {id:2, text:'Salary', amount: 300},
//     {id:3, text:'Book', amount: -10},
//     {id:4, text:'Camera', amount:150},

// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []; 

// let transactions = dummyTransaction;

// Add transaction
function addTransaction(ev){
    ev.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() == '') {
        alert('please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionToDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID(){
    Math.floor(Math.random()*1000000000);
}

// add transactions to DOM List

function addTransactionToDOM(transaction){
    // Get the sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add Class based on value
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');

    item.innerHTML = `
        ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}
        </span> <button class="delete-btn" onclick ="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expenses = amounts
        .filter( item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
  balance.innerText = `$${total}`;
  money_minus.innerText = `$${expenses}`;
  money_plus.innerText = `$${income}`;

}

// remove transaction by ID

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Init app 
function init() {
    list.innerHTML ='';
    transactions.forEach(addTransactionToDOM);
}

form.addEventListener('submit', addTransaction);

updateValues();

init();