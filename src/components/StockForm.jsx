import React, { useState } from 'react';

function StockForm({ addStock }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return "";
    addStock(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="stock">Stocks</label>
      <input type="text" name='stock' id='stock' className='input' value={value} onChange={(e) => setValue(e.target.value.toUpperCase())} />
      <button>Enter</button>
    </form>
  );
}

export default StockForm;

