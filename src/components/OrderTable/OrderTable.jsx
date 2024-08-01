import React, { useState } from 'react';
import Order from '../Order/Order';
import './OrderTable.css';

function OrderTable({ tableName, orders, tableId, serverName, timePassed, initialStatus, peopleCount }) {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = () => {
    const nextStatus = status === 'new' ? 'cooking' : (status === 'cooking' ? 'done' : 'new');
    setStatus(nextStatus);
  };

  return (
    <div className={`order-table ${status}`}>
      <div className="header">
        <div className="title">{tableName}</div>
        <div className="id-server">
          <div>{`#${tableId}`}</div>
          <div>{`Served by ${serverName}`}</div>
        </div>
      </div>
      <div className="orders">
        {Object.entries(orders).map(([product, quantity]) => (
          <Order key={product} product={product} quantity={quantity} />
        ))}
      </div>
      <div className="footer">
        <div className="time-status">
          {timePassed} | <button onClick={handleStatusChange}>{status}</button>
        </div>
        <div className="people-count">People: {peopleCount}</div>
      </div>
    </div>
  );
}

export default OrderTable;
