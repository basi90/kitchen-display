import React from 'react';
import OrderTable from './OrderTable';

function Table({ data }) {
  return (
    <div className="table">
      {Object.entries(data).map(([tableName, orders]) => (
        <OrderTable key={tableName} tableName={tableName} orders={orders} />
      ))}
    </div>
  );
}

export default Table;
