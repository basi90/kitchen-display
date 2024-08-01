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
      // Continue to the next iteration if the order or the table name is null
      if (!order || !order.table_name) return;

      if (!ordersByTable[order.table_name]) {
        ordersByTable[order.table_name] = {};
      }

      order.products.forEach(product => {
        // Skip if the product name or quantity is null
        if (!product || !product.name || product.quantity == null) return;

        if (!ordersByTable[order.table_name][product.name]) {
          ordersByTable[order.table_name][product.name] = 0;
        }
        ordersByTable[order.table_name][product.name] += product.quantity;
      });

      // After processing all products for a table, check if the table has any non-null entries
      if (Object.keys(ordersByTable[order.table_name]).length === 0) {
        delete ordersByTable[order.table_name]; // Remove the table if it has no valid products
      }
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
        <Table data={Object.fromEntries(displayedTables)} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        <div className="side-button left">
          <button className="button" onClick={() => handlePageChange('prev')}>&lt; Previous</button>
        </div>
        <div className="side-button right">
          <button className="button" onClick={() => handlePageChange('next')}>Next &gt;</button>
        </div>
      </div>
    </div>

  );
}

export default App;
