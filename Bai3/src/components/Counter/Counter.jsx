import { useState } from 'react';

const Counter = () => {
  // State: count
  const [count, setCount] = useState(0);

  // Event handler
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Inline styles object
  const containerStyle = {
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '300px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      <h2>Ứng dụng Đếm</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Số đếm: {count}</p>
      
      {count < 0 && <p style={{ color: 'red' }}>Cảnh báo: Số âm!</p>}

      <div>
        <button style={buttonStyle} onClick={decrement}>-</button>
        <button style={buttonStyle} onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
