import { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(0);
  
  

  useEffect(() => {
    // Fetch the list of currencies
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setCurrencies([...Object.keys(response.data.rates)]);
        setRate(response.data.rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching currencies", error));
  }, [toCurrency]);

  useEffect(() => {
    // Fetch the conversion rate whenever the currency changes
    if (fromCurrency !== toCurrency) {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => {
          setRate(response.data.rates[toCurrency]);
        })
        .catch((error) => console.error("Error fetching rates", error));
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConvert = () => {
    setResult((amount * rate).toFixed(2));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="fscrn">
      <div className="box">
        <h2>Currency Converter</h2>

        <div className="input-one">
          <input
            type="number"
            placeholder="From"
            value={amount}
            onChange={handleAmountChange}
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button className="swap-btn" onClick={handleSwap}>Swap</button>

        <div className="input-two">
          <input type="number" placeholder="To" value={result} disabled />
          <select
            name="selecetCountry"
            id="countryId"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="cnvrtd-amnt-btn">
          <button onClick={handleConvert}>Convert {fromCurrency} to {toCurrency}</button>
          <h3>Amount: {result}</h3>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
