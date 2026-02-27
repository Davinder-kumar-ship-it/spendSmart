const transactions = {
    date: [],
    image: [],
    spendedRs: [],
    message: [],
    backgroundColor: []
};

let totalBalance = 0;

const title = document.querySelector('#title');
const transactionBox = document.querySelector('#transactionAdder');
const rightSection = document.querySelector('#rightSection');
const dashboard = document.querySelector('#dashBoard');
const inputMessage = document.querySelector('#inputMessage');
const totalRsInTransactionAdder = document.querySelector('#totalRs');
const noTransaction = document.querySelector('#noTransaction');
const categoriesBox = document.querySelector('#categoriesBox');
const addMoneyAdder = document.querySelector('#addMoneyAdder');
const totalMoneyValue = document.querySelector('#totalMoneyValue');

// Helper: show/hide modal with overlay effect
function openModal(modal) {
    modal.style.display = 'flex';
    rightSection.style.opacity = '50%';
}
function closeModal(modal) {
    modal.style.display = 'none';
    rightSection.style.opacity = '100%';
}

// RIGHT SECTION CLICK (floating + button)
document.querySelector('#rightSection').addEventListener('click', (event) => {
    if (event.target.id === 'addExpensiveBox') {
        transactionBox.style.display = 'grid';
        rightSection.style.opacity = '50%';
    } else if (event.target.id === 'addMoneyBox') {
        openModal(addMoneyAdder);
    }
});

// ADD MONEY BOX 1 (on empty screen)
document.querySelector('#addMoneyBox1').addEventListener('click', () => {
    openModal(addMoneyAdder);
});

// ADD MONEY MODAL EVENTS
document.querySelector('#addMoneyAdder').addEventListener('click', (event) => {
    if (event.target.id === 'addMoneyDeleteOption' || event.target.id === 'addMoneyCancelBtn') {
        closeModal(addMoneyAdder);
        document.querySelector('#addMoneyInput').value = '';
        document.querySelector('#addMoneyNoteInput').value = '';
    } else if (event.target.id === 'addMoneyAcceptBtn') {
        const amount = parseFloat(document.querySelector('#addMoneyInput').value);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount!');
            return;
        }
        totalBalance += amount;
        totalMoneyValue.textContent = totalBalance.toFixed(2);

        // Show dashboard if hidden
        noTransaction.style.display = 'none';
        dashboard.style.display = 'flex';

        // Add to transaction history as income
        const note = document.querySelector('#addMoneyNoteInput').value || 'Money Added';
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
            now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        document.querySelector('#transactionHistory').insertAdjacentHTML('afterbegin',
            `<div class="transactionHistoryBox">
                <div class="transactionHistoryItem" id="transactionImage">
                    <img class="image" src="/Frontend/assets/img/profile.png" alt="">
                </div>
                <div class="transactionHistoryItem" id="messageOfSpending">
                    <p class="spendingMessage">${note}</p>
                    <p class="date">${dateStr}</p>
                </div>
                <div class="transactionHistoryItem" style="color:#38a169; font-weight:600; align-self:center;">+$${amount.toFixed(2)}</div>
            </div>`
        );

        closeModal(addMoneyAdder);
        document.querySelector('#addMoneyInput').value = '';
        document.querySelector('#addMoneyNoteInput').value = '';
        alert('Money added successfully!');
    }
});

// TRANSACTION ADDER EVENTS
document.querySelector('#transactionAdder').addEventListener('click', (event) => {

    if (event.target.id === 'deleteOption' || event.target.id === 'cancelBtn') {
        rightSection.style.opacity = '100%';
        transactionBox.style.display = 'none';
        totalRsInTransactionAdder.textContent = '0';
        inputMessage.value = '';
        inputMessage.setAttribute('type', 'text');
        inputMessage.setAttribute('placeholder', 'Expense Name');
    }
    else if (event.target.id === 'increaseRs') {
        totalRsInTransactionAdder.textContent = String(Number.parseInt(totalRsInTransactionAdder.textContent) + 1);
    }
    else if (event.target.id === 'decreaseRs') {
        const current = Number.parseInt(totalRsInTransactionAdder.textContent);
        if (current > 0) {
            totalRsInTransactionAdder.textContent = String(current - 1);
        }
    }
    else if (event.target.id === 'totalRs') {
        inputMessage.setAttribute('placeholder', 'Enter Amount');
        inputMessage.focus();
        inputMessage.setAttribute('type', 'number');
    }
    else if (event.target.id === 'utilities') {
        for (let index = 1; index < categoriesBox.children.length; index++) {
            categoriesBox.children[index].style.backgroundColor = '';
            categoriesBox.children[index].style.color = '';
            categoriesBox.children[index].style.borderColor = '';
        }
        event.target.style.backgroundColor = '#ede9fe';
        event.target.style.color = '#6c63ff';
        event.target.style.borderColor = '#6c63ff';
    }
    else if (event.target.id === 'food') {
        for (let index = 1; index < categoriesBox.children.length; index++) {
            categoriesBox.children[index].style.backgroundColor = '';
            categoriesBox.children[index].style.color = '';
            categoriesBox.children[index].style.borderColor = '';
        }
        event.target.style.backgroundColor = '#f0fff4';
        event.target.style.color = '#38a169';
        event.target.style.borderColor = '#38a169';
    }
    else if (event.target.id === 'acceptedBtn') {
        const expenseName = inputMessage.value.trim();
        const amount = Number.parseInt(totalRsInTransactionAdder.textContent);

        if (!expenseName) {
            alert('Please enter an expense name!');
            return;
        }
        if (amount <= 0) {
            alert('Please enter a valid amount!');
            return;
        }

        transactions.message.push(expenseName);
        transactions.spendedRs.push(totalRsInTransactionAdder.textContent);
        transactions.date.push(
            document.querySelector('#dateValue').value
                ? new Date(document.querySelector('#dateValue').value).toLocaleString()
                : new Date().toLocaleString()
        );

        // Subtract from balance
        totalBalance -= amount;
        if (totalMoneyValue) totalMoneyValue.textContent = totalBalance.toFixed(2);

        noTransaction.style.display = 'none';
        dashboard.style.display = 'flex';

        document.querySelector('#transactionHistory').insertAdjacentHTML('afterbegin',
            `<div class="transactionHistoryBox">
                <div class="transactionHistoryItem" id="transactionImage">
                    <img class="image" src="/Frontend/assets/img/profile.png" alt="">
                </div>
                <div class="transactionHistoryItem" id="messageOfSpending">
                    <p class="spendingMessage">${transactions.message.at(-1)}</p>
                    <p class="date">${transactions.date.at(-1)}</p>
                </div>
                <div class="transactionHistoryItem" style="color:#e53e3e; font-weight:600; align-self:center;">-$${transactions.spendedRs.at(-1)}</div>
            </div>`
        );

        // Reset modal
        rightSection.style.opacity = '100%';
        transactionBox.style.display = 'none';
        totalRsInTransactionAdder.textContent = '0';
        inputMessage.value = '';
        inputMessage.setAttribute('type', 'text');
        inputMessage.setAttribute('placeholder', 'Expense Name');
        // Reset categories
        for (let index = 1; index < categoriesBox.children.length; index++) {
            categoriesBox.children[index].style.backgroundColor = '';
            categoriesBox.children[index].style.color = '';
            categoriesBox.children[index].style.borderColor = '';
        }

        alert('Expense added successfully!');
    }
});

// Input handler: live update amount
inputMessage.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && inputMessage.getAttribute('type') === 'number') {
        totalRsInTransactionAdder.textContent = inputMessage.value || '0';
        inputMessage.value = '';
        inputMessage.setAttribute('type', 'text');
        inputMessage.setAttribute('placeholder', 'Expense Name');
    } else if (inputMessage.getAttribute('type') === 'number') {
        totalRsInTransactionAdder.textContent = inputMessage.value || '0';
    }
});

// LEFT SECTION NAVIGATION
document.querySelector('#leftSection').addEventListener('click', (event) => {
    const element = event.target.closest('.leftSectionElement');
    if (element) {
        document.querySelectorAll('.leftSectionElement').forEach(event => event.classList.remove('active'));
        element.classList.add('active');
    }
});
