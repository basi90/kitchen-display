// src/components/Table.jsx
import React from 'react';
import OrderTable from '../OrderTable/OrderTable';
import './Table.css';

function Table({ data }) {
  return (
    <div className="table">
      {Object.entries(data).map(([tableName, orders]) => (
        <OrderTable
          key={tableName}
          tableName={tableName}
          orders={orders}
          tableId="123"
          serverName="John Doe"
          timePassed="15 mins"
          initialStatus="new"
          peopleCount={4}
        />
      ))}
    </div>
  );
}

export default Table;
