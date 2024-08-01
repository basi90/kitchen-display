import React, { useState, useEffect } from 'react';
import Order from '../Order/Order';
import './OrderTable.css';

const names = ["Bram", "Annelies", "Joren", "Els", "Stijn", "Lotte", "Wout", "Ine", "Karel", "Leen"];

function OrderTable({ tableName, orders, tableId, serverName, timePassed, initialStatus, initialPeopleCount, isHighlighted, onHighlightChange }) {
  const [status, setStatus] = useState(initialStatus);
  const [peopleCount, setPeopleCount] = useState(initialPeopleCount);
  const [waiter, setWaiterName] = useState(serverName);

  useEffect(() => {
    const randomPeopleCount = () => Math.floor(Math.random() * 8) + 1;
    setPeopleCount(randomPeopleCount());
    const randomName = names[Math.floor(Math.random() * names.length)];
    setWaiterName(randomName);
  }, []);

  const handleTableClick = () => {
    if (!isHighlighted) {
      onHighlightChange(tableId);
    } else {
      if (status !== 'done') {
        const nextStatus = status === 'new' ? 'cooking' : 'done';
        setStatus(nextStatus);
      }
    }
  };

  const isEmpty = Object.keys(orders).length === 0;

  return (
    <div className={`order-table ${status} ${isHighlighted ? 'highlighted' : ''}`} onClick={handleTableClick}>
      <div className="header">
        <div className="table-title">{tableName}</div>
        <div className="id-server">
          <div>{`#${tableId}`}</div>
          <div>{`Served by ${waiter}`}</div>
        </div>
      </div>
      <div className="orders">
        {isEmpty ? (
          <div className="placeholder">
            <div className="placeholder-id">{`Table #${tableId}`}</div>
          </div>
        ) : (
          Object.entries(orders).map(([product, quantity]) => (
            <Order key={product} product={product} quantity={quantity} />
          ))
        )}
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
