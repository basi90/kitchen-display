import React, { useState } from 'react';
import Order from '../Order/Order';
import './OrderTable.css';

function OrderTable({ tableName, orders, tableId, serverName, timePassed, initialStatus, peopleCount, isHighlighted, onHighlightChange }) {
  const [status, setStatus] = useState(initialStatus);

  const handleTableClick = () => {
    if (!isHighlighted) {
      onHighlightChange(tableId); // Highlight the table
    } else {
      // Change status when table is already highlighted
      if (status !== 'done') {
        const nextStatus = status === 'new' ? 'cooking' : 'done';
        setStatus(nextStatus);
      }
    }
  };

  return (
    <div className={`order-table ${status} ${isHighlighted ? 'highlighted' : ''}`} onClick={handleTableClick}>
      <div className="header">
        <div className="table-title">{tableName}</div>
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
          {timePassed} | {status}
        </div>
        <div className="people-count">People: {peopleCount}</div>
      </div>
    </div>
  );
}

export default OrderTable;
