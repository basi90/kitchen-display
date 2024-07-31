import React from 'react';
import Order from './Order';

function OrderTable({ tableName, orders }) {
  return (
    <div className="order-table">
      <h2>Table: {tableName}</h2>
      {Object.entries(orders).map(([product, quantity]) => (
        <Order key={product} product={product} quantity={quantity} />
      ))}
    </div>
  );
}

export default OrderTable;
