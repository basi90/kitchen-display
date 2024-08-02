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
          key={index}
          tableId={((currentPage - 1) * itemsPerPage) + index + 1}
          tableName={tableName}
          orders={orders}
          timePassed="15m"
          initialStatus="new"
          isHighlighted={((currentPage - 1) * itemsPerPage) + index + 1 === highlightedId}
          onHighlightChange={handleHighlightChange}
        />
      ))}
    </div>
  );
}

export default Table;
