import { useState, useEffect } from "react";
import axios from "axios";


function Crncyconv() {

    const [currencies, setCurrencies] = useState([])
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [amount, setAmount] = useState(1)
    const [rate, setRate] = useState(0)
    const [result, setResult] = useState(null)

    useEffect(()=>
        
        axios
        .get("https://api.exchangerate-api.com/v4/latest/USD")
        .then((response)=>{
            setCurrencies([...Object.keys(response.data.rates)])
            setRate(response.data.rates[toCurrency])
        })
    )

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
    
      

  return (
    <div>
      <input
        type="number"
        placeholder="from"
        value={amount}
        onChange={handleAmountChange}
      />
      <select
        value={fromCurrency}
        onChange={(e)=> setFromCurrency(e.target.value)}
      >
        {currencies.map((currency)=> (
            <option key={currency} value={currency}>
                {currency}
            </option>
        ))}
      </select>

      <input type="number"
      placeholder="to"
      value={result}
      disabled />

        <select name="" id="" value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value)}
        >
            {currencies.map((currency)=> (
            <option key={currency} value={currency}>{currency}</option>
        ))}

        </select>
        <button onClick={handleConvert}>conv</button>
    </div>
  )
}

export default Crncyconv
