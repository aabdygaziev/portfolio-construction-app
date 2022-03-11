import React from 'react';

function Stock({stock, index, removeStock}){
  return (
    <div>
      <label htmlFor="stock">{stock.ticker}</label>
      <input type="text" id='stock' name='stock'/>
    </div>
  );
}

export default Stock;