import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Table from './components/Table/Table';
import './App.css';

function App() {
  // State for storing processed order data
  const [processedData, setProcessedData] = useState({});

  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Constant for items per page in pagination
  const itemsPerPage = 8;

  // useEffect hook for fetching data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetching data from the API
        const response = await fetch('https://staging.smartendr.be/app/api_get_orders?locations=23,12&timestamp=43399');
        const data = await response.json();
        const groupedData = processData(data.orders);
        setProcessedData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error); // Logging any errors during fetch
      }
    }
    fetchData();
  }, []);

  // Function to process the fetched orders data
  function processData(orders) {
    const ordersByTable = {};

    orders.forEach(order => {
      if (!order || !order.table_name) return;

      if (!ordersByTable[order.table_name]) {
        ordersByTable[order.table_name] = {};
      }

      order.products.forEach(product => {
        if (!product || !product.name || product.quantity == null) return;

        if (!ordersByTable[order.table_name][product.name]) {
          ordersByTable[order.table_name][product.name] = 0;
        }
        ordersByTable[order.table_name][product.name] += product.quantity;
      });

      if (Object.keys(ordersByTable[order.table_name]).length === 0) {
        delete ordersByTable[order.table_name];
      }
    });

    return ordersByTable;
  }

  // Function to handle pagination change
  function handlePageChange(direction) {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  // Calculating total pages for pagination
  const totalPages = Math.ceil(Object.keys(processedData).length / itemsPerPage);

  // Determining the orders to be displayed based on current page
  const displayedTables = Object.entries(processedData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="App">
      <Navbar currentPage={currentPage} totalPages={totalPages} />
      <div className="table-container">
        <Table data={Object.fromEntries(displayedTables)} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      </div>
      <div className="navigation-buttons">
        <div className="arrow-button left" onClick={() => handlePageChange('prev')}>
          <div className="arrow-left"></div>
        </div>
        <div className="arrow-button right" onClick={() => handlePageChange('next')}>
          <div className="arrow-right"></div>
        </div>
      </div>
    </div>

  );
}

export default App;
