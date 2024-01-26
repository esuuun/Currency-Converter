const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");

const valueOne = document.getElementById("currency-one-number");
const valueTwo = document.getElementById("currency-two-number");
const convert = document.getElementById("convert-button");

function myFunction() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  // console.log(currencyOneValue);
  const url1 = `https://v6.exchangerate-api.com/v6/3fda58a82e342dced2511ac9/latest/${currencyOneValue}`;

  const url2 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json`;

  if (currencyOneValue === "BTC") {
    fetch(url2)
      .then((res) => res.json())
      .then((data) => {
        const currencyTwoValueLower = currencyTwoValue.toLowerCase(); 
        const btcPrice = data.btc[currencyTwoValueLower];        
        
        const currencyRateValue = btcPrice * valueOne.value;
        valueTwo.value = currencyRateValue.toFixed(3);
        
      });
    
  } else {
    fetch(url1)
      .then((res) => res.json())
      .then((data) => {
        const currencyRate = data.conversion_rates[currencyTwoValue];

        const currencyRateValue = currencyRate * valueOne.value;

        
        if (currencyOneValue === currencyTwoValue) {
          valueTwo.value = currencyRateValue;
        }
        else {
          
          valueTwo.value = currencyRateValue.toFixed(3);
        }
      });
  }
}

valueOne.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

convert.addEventListener("click", myFunction);

valueOne.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    myFunction();
  }
});
document.addEventListener('keypress', () => {
  valueOne.focus()
})
