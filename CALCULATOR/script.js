// --- DOM Element Selection ---
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('history-list');
const historyToggleBtn = document.getElementById('history-toggle-btn');
const historyPanel = document.getElementById('history-panel');

// --- State Variables ---
let currentInput = '0';
let calculationDone = false;
let history = []; // Array to store calculation history

// --- Core Functions ---

/**
 * Appends a value to the calculator's input string.
 * @param {string} value The character or number to append.
 */
function appendToDisplay(value) {
    if (calculationDone) {
        const isOperator = ['+', '−', '×', '÷'].includes(value);
        if (isOperator) {
            calculationDone = false;
        } else {
            currentInput = '0';
            calculationDone = false;
        }
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = '';
    }

    currentInput += value;
    updateDisplay();
}

/**
 * Updates the display element with the current input.
 */
function updateDisplay() {
    display.textContent = currentInput;
}

/**
 * Resets the calculator to its initial state.
 */
function clearDisplay() {
    currentInput = '0';
    calculationDone = false;
    updateDisplay();
}

/**
 * Deletes the last character from the input.
 */
function deleteLast() {
    if (calculationDone) {
        clearDisplay();
        return;
    }
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

/**
 * Evaluates the expression, updates history, and displays the result.
 */
function calculateResult() {
    if (calculationDone || !currentInput || currentInput === 'Error') return;

    try {
        const expression = currentInput;
        let evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        
        if (/[*\/+-]$/.test(evalExpression)) {
            throw new Error("Invalid expression");
        }
        
        const result = new Function('return ' + evalExpression)();

        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        
        const roundedResult = Math.round(result * 1e10) / 1e10;
        
        addToHistory(expression, roundedResult);
        
        currentInput = String(roundedResult);
        calculationDone = true;

    } catch (error) {
        currentInput = 'Error';
        calculationDone = true;
    }
    
    updateDisplay();
}

/**
 * Adds a calculation to the history array and updates the display.
 * @param {string} expression The calculation expression.
 * @param {number} result The result of the calculation.
 */
function addToHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > 20) {
        history.pop();
    }
    updateHistoryDisplay();
}

/**
 * Renders the history array into the history panel.
 */
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    if (history.length === 0) {
        historyList.innerHTML = '<p class="text-center text-gray-400 text-sm mt-4">No history yet.</p>';
        return;
    }
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="expression">${item.expression} = ${item.result}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        historyList.appendChild(historyItem);
    });
}

/**
 * Removes an item from the history.
 * @param {number} index The index of the item to remove.
 */
function removeFromHistory(index) {
    history.splice(index, 1);
    updateHistoryDisplay();
}

/**
 * Loads history from browser's localStorage.
 */
function loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
    updateHistoryDisplay();
}

// --- Event Handling ---

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            appendToDisplay(value);
        } else if (['÷', '×', '−', '+'].includes(value)) {
            appendToDisplay(value);
        } else if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '←') {
            deleteLast();
        } else if (value === 'Save') {
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
            alert('History saved!');
        }
    });
});

historyList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.dataset.index;
        removeFromHistory(index);
    }
});

// Add event listener for the new history toggle button
if (historyToggleBtn && historyPanel) {
    historyToggleBtn.addEventListener('click', () => {
        historyPanel.classList.toggle('hidden');
    });
}

// Load history from localStorage when the page loads.
loadHistory();
