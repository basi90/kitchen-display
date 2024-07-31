import React, { useEffect, useState } from 'react';
import Table from './components/Table';

function App() {
  const [processedData, setProcessedData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://staging.smartendr.be/app/api_get_orders?locations=23,12&timestamp=43399');
        const data = await response.json();
        const groupedData = processData(data.orders);
        setProcessedData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  function processData(orders) {
    const ordersByTable = {};

    orders.forEach(order => {
      if (!ordersByTable[order.table_name]) {
        ordersByTable[order.table_name] = {};
      }

      order.products.forEach(product => {
        if (!ordersByTable[order.table_name][product.name]) {
          ordersByTable[order.table_name][product.name] = 0;
        }
        ordersByTable[order.table_name][product.name] += product.quantity;
      });
    });

    return ordersByTable;
  }

  return (
    <div className="App">
      <h1>Kitchen Display System</h1>
      <Table data={processedData} />
    </div>
  );
}

export default App;
