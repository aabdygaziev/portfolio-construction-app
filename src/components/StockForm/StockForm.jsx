import React, { useState } from 'react';
import './index.css';

function StockForm({ addStock }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return "";
    addStock(value);
    setValue("");
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name='stock' 
        id='stock' 
        className='stock-input' 
        value={value} 
        onChange={(e) => setValue(e.target.value.toUpperCase())} 
        placeholder="Enter your stocks"
        />
        <button id='submit'><strong>ENTER</strong></button>
      </form>
    </div>
  );
}

export default StockForm;
