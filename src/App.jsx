import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Table from './components/Table/Table';
import './App.css';

function App() {
  const [processedData, setProcessedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  function handlePageChange(direction) {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  const totalPages = Math.ceil(Object.keys(processedData).length / itemsPerPage);
  const displayedTables = Object.entries(processedData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="App">
      <Navbar currentPage={currentPage} totalPages={totalPages} />
      <div className="table-container">
        <Table data={Object.fromEntries(displayedTables)} />
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')}>Previous</button>
        <button onClick={() => handlePageChange('next')}>Next</button>
      </div>
    </div>
  );
}

export default App;
