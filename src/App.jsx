import { getStockData, calcStats, useDidUpdate } from "./utils.js";
import React, { useState, useEffect, useRef } from 'react';
import StockForm from './components/StockForm/StockForm';
import Table from './components/Table/Table';
import './App.css';

function App() {
  const [tickers, setTickers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [stats, setStats] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);

  
  useEffect(async () => {
    let data = await getStockData(tickers);
    setStockPrices(data);
    setLoaded(true);
  },[tickers]);

  useDidUpdate(() => {
    let newStats = calcStats(stockPrices, tickers);
    setStats(newStats);
  }, [stockPrices]);

  console.log(stats);

  const addStock = stock => {
    const newTickers= [...tickers, stock];
    setTickers(newTickers);
  }

  return (
    <div className='App'>
      <header>
        <h1>Optimal Portfolio Constructor</h1>
      </header>
      <StockForm addStock={addStock}/>
      <br/><hr/><br/>
      <p>Enter your stock tickers separated by a comma</p> 
      <p>Example: AAPL, MSFT, TSLA.</p>
      {/*<button onClick={}>Get Data</button>*/}
      <br/><br/>
    </div>
  );
}

export default App;
