// Expense Manager App Functionality

// Initialize expenses array
let expenses = [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseListBody = document.getElementById('expense-list-body');
const totalExpensesElement = document.getElementById('total-expenses');
const noExpensesMessage = document.getElementById('no-expenses-message');

// Set today's date as default
document.getElementById('date').valueAsDate = new Date();

// Add event listener to form
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    
    // Validate inputs
    if (!description || isNaN(amount) || amount <= 0 || !category || !date) {
        alert('Please fill in all fields with valid values.');
        return;
    }
    
    // Create expense object
    const expense = {
        id: Date.now(), // Unique ID based on timestamp
        description,
        amount,
        category,
        date
    };
    
    // Add expense to array
    expenses.push(expense);
    
    // Update UI
    renderExpenses();
    updateTotalExpenses();
    
    // Reset form
    expenseForm.reset();
    document.getElementById('date').valueAsDate = new Date();
});

// Function to render expenses
function renderExpenses() {
    // Clear existing expenses
    expenseListBody.innerHTML = '';
    
    // Check if there are expenses
    if (expenses.length === 0) {
        noExpensesMessage.style.display = 'block';
        return;
    }
    
    // Hide no expenses message
    noExpensesMessage.style.display = 'none';
    
    // Add each expense to the table
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        
        // Format date for display
        const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${formattedDate}</td>
            <td>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
            </td>
        `;
        
        expenseListBody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteExpense(id);
        });
    });
}

// Function to delete an expense
function deleteExpense(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this expense?')) {
        // Filter out the expense with the given id
        expenses = expenses.filter(expense => expense.id !== id);
        
        // Update UI
        renderExpenses();
        updateTotalExpenses();
    }
}

// Function to update total expenses
function updateTotalExpenses() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpensesElement.textContent = `₹${total.toFixed(2)}`;
}

// Initialize the app
function init() {
    renderExpenses();
    updateTotalExpenses();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);