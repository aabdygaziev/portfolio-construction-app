//custom hook
import React, {useRef, useEffect } from 'react';
export const useDidUpdate = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

// fetch data
export async function getStockData(tickers) {
  tickers = tickers[0].split(',').map(ticker => ticker.trim());
  const options = {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
      "x-rapidapi-key": "f16bd58762msh183d1f7054913f0p1b1f03jsn5291dfc43dcc",
    },
  };

  let urls = [];
  tickers.forEach(ticker => {
    let url = `https://twelve-data1.p.rapidapi.com/time_series?symbol=${ticker}&interval=1month&outputsize=60&format=json`;
    urls.push(url);
  });

  try {
    let results = await Promise.all(urls.map(url => fetch(url, options).then(res => res.json())));
    
    let data = [];
    for (let i = 0; i < tickers.length; i++) {
      let stock = {};
      stock[`${results[i].meta.symbol}`] = results[i].values;
      data.push(stock);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
}

// debounce function
export const debounce = (func, delay) => {
  let setTimeoutInstance;
  return function () {
    const args = arguments;
    if (setTimeoutInstance) clearTimeout(setTimeoutInstance);
    setTimeoutInstance = setTimeout(() => func.apply('', args), delay);
  };
};


// calculate returns
export function calcStats(stocks, tickers) {
  tickers = tickers[0].split(',').map(ticker => ticker.trim());
  
  let result = [];
  
  for (let i = 0; i < stocks.length; i++) {
    let returns = [];
    let stock = stocks[i][tickers[i]];
    let len = stock.length;
    for (let j = 1; j < len; j++) {
      let currPrice = Number(stock[j - 1].close);
      let prevPrice = Number(stock[j].close);
      let delta = (currPrice - prevPrice) / prevPrice;
      returns.push(delta);
    }
  
    let mean = (returns.reduce((sum, price) => sum + price, 0) / returns.length);
    let variance = calcVar(returns, mean);
    let yMean = calcYearlyReturn(mean);
    let yVariance = calcYearlyVariance(variance);
    
    let obj = {
      ticker: tickers[i],
      meanReturn: mean,
      variance: variance.toFixed(2),
      yMean: yMean,
      yVariance: yVariance.toFixed(2),
    }

    result.push(obj);
  }
  
  return result;
}

function calcYearlyVariance(mean, n=12) {
  // 52 weeks in a year
  return mean * n;
}

function calcYearlyReturn(mean, n=12) {
  // 52 weeks in a year
  return mean * n;
}


function calcVar(wReturn, mean) {
  let sqSum = [];
  let n = wReturn.length - 1;
  for (let i = 0; i < wReturn.length; i++) {
    let delta = (wReturn[i] - mean)**2;
    sqSum.push(delta);
  }
  return sqSum.reduce((sum, v) => sum + v,0) / n;
}















