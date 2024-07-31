import React, { useEffect, useState } from 'react';
import Table from './components/Table';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://staging.smartendr.be/app/api_get_orders?locations=23,12&timestamp=43399');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Kitchen Display System</h1>
      <Table data={orders} />
    </div>
  );
}

export default App;
