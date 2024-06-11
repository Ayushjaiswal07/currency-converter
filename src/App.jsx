import { useEffect, useState } from 'react';
import InputBox from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import useCurrencyOptions from './hooks/useCurrencyOptions';


function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("aud");
  const [to, setTo] = useState("aud");
  const [convertedAmount, setConvertedAmount] = useState(1);

  const options = useCurrencyOptions();

  const conversionRate = useCurrencyInfo(from, to);
  let amt = 0;

  useEffect(() => {
    if (conversionRate !== null) {
        amt = amount * conversionRate
    }
  }, [conversionRate, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = (e) => {
    e.preventDefault();
    // The conversion is now handled by the useEffect hook
    setConvertedAmount(amt);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={convert}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        <p className='text-black/60 font-serif text-center text-lg mt-3 font-bold'>A Project by <a href="https://www.linkedin.com/in/ayush-jaiswal-330937210/" target='blank'><u>Ayush Jaiswal</u></a></p>
        </div>
      </div>
    </div>
  );
}
 
export default App;
