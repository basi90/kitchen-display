import React, { useState } from 'react';
import OrderTable from '../OrderTable/OrderTable';
import './Table.css';

function Table({ data }) {
  const [highlightedId, setHighlightedId] = useState(null);

  const handleHighlightChange = (id) => {
    setHighlightedId(id);
  };

  return (
    <div className="table">
      {Object.entries(data).map(([tableName, orders], index) => (
        <OrderTable
          key={tableName}
          tableName={tableName}
          orders={orders}
          tableId={tableName} // Assuming tableName is unique and can be used as id
          serverName="John Doe"
          timePassed="15 mins"
          initialStatus="new"
          peopleCount={4}
          isHighlighted={tableName === highlightedId}
          onHighlightChange={handleHighlightChange}
        />
      ))}
    </div>
  );
}

export default Table;
