import React, { useState } from 'react';
import OrderTable from '../OrderTable/OrderTable';
import './Table.css';

function Table({ data, currentPage, itemsPerPage }) {
  const [highlightedId, setHighlightedId] = useState(null);

  const handleHighlightChange = (id) => {
    setHighlightedId(id);
  };

  return (
    <div className="table">
      {Object.entries(data).map(([tableName, orders], index) => (
        <OrderTable
          key={index} // You might want to find a more stable key if the data changes
          tableId={((currentPage - 1) * itemsPerPage) + index + 1} // Calculate ID based on current page and index
          tableName={tableName}
          orders={orders}
          serverName="John Doe"
          timePassed="15m"
          initialStatus="new"
          peopleCount={4}
          isHighlighted={((currentPage - 1) * itemsPerPage) + index + 1 === highlightedId}
          onHighlightChange={handleHighlightChange}
        />
      ))}
    </div>
  );
}

export default Table;
