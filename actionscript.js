//Javascript for the web application action/functioning

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');


const apiKey = '9c4ba3b59fb340288b0854e3'; //API key
const apiUrl = 'https://v6.exchangerate-api.com/v6/9c4ba3b59fb340288b0854e3/latest/USD'; // API endpoint

convertBtn.addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }

    if (fromCurrency === ' ' || toCurrency === ' ') {
        resultDiv.textContent = 'Please select both currencies.';
        return;
    }

    const fullApiUrl = `${apiUrl}${fromCurrency}`;

    try {
        const response = await fetch(fullApiUrl);
        const data = await response.json();

        if (data.rates && data.rates[toCurrency]) {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
        } else {
            resultDiv.textContent = 'Error fetching exchange rates.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        resultDiv.textContent = 'An error occurred while fetching data.';
    }
}