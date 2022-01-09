
// items.json fetch here for understand the concept of how fetch api work...
// function calculator() {
//     fetch('items.json')
//     .then(res=> res.json())
//     .then(data => document.body.innerHTML = data[0].text);

// }
// calculator();



///////////////////////////////////////////////////////////////////////////////
// Get Dom Elements...

const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch Exchange Rates & Update the DOM....

function calculate() {
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;


    fetch(`https://v6.exchangerate-api.com/v6/855726ed3d081f47c76099de/pair/${currencyOneCode}/${currencyTwoCode}`)
        .then(res => res.json())
        .then(data => {
            //  get the conversion rate from currency one to two...
            const conversionRate = data.conversion_rate;
            rate.innerText = `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;
            // update the Currency Two Amount...
            amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate).toFixed(2);
        });
};
calculate();
// EventListeners..
// recalculate exchange rate when currencys or amounts changes...

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountCurrencyOne.addEventListener('input', calculate);
amountCurrencyTwo.addEventListener('input', calculate);


swap.onclick = () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    // recalculate exchange rate after swap.. 
    calculate();
}

