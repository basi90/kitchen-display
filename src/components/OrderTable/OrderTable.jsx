import React, { useState, useEffect, useRef } from 'react';
import Order from '../Order/Order';
import './OrderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

const names = ["Bram", "Annelies", "Joren", "Els", "Stijn", "Lotte", "Wout", "Ine", "Karel", "Leen"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function OrderTable({ tableName, orders, tableId, serverName, timePassed, initialStatus, initialPeopleCount, isHighlighted, onHighlightChange }) {
  const [status, setStatus] = useState(initialStatus);
  const [peopleCount, setPeopleCount] = useState(initialPeopleCount);
  const [waiter, setWaiterName] = useState(serverName);
  const ordersRef = useRef(null);
  const [showMoreIndicator, setShowMoreIndicator] = useState(false);

  useEffect(() => {
    const randomPeopleCount = () => Math.floor(Math.random() * 8) + 1;
    setPeopleCount(randomPeopleCount());
    const randomName = names[Math.floor(Math.random() * names.length)];
    setWaiterName(randomName);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!ordersRef.current) {
        console.log("Ref not attached");
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = ordersRef.current;
      console.log("Scroll Top:", scrollTop);
      console.log("Scroll Height:", scrollHeight);
      console.log("Client Height:", clientHeight);

      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1;
      console.log("Is Scrolled To Bottom:", isScrolledToBottom);

      setShowMoreIndicator(!isScrolledToBottom);
    };

    const element = ordersRef.current;
    if (element) {
      element.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', checkScroll);
      }
    };
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

  return (
    <div className={`order-table ${status} ${isHighlighted ? 'highlighted' : ''}`} onClick={handleTableClick}>
      <div className="header">
        <div className="table-title">{tableName}</div>
        <div className="id-server">
          <div>{`#${tableId}`}</div>
          <div>{`Served by ${waiter}`}</div>
        </div>
      </div>
      <div className="orders" ref={ordersRef}>
        {Object.entries(orders).map(([product, quantity]) => (<Order key={product} product={product} quantity={quantity} />))}
        {showMoreIndicator && <div className="more-items-indicator">&#x25BC; More Items</div>}
      </div>
      <div className="footer">
        <div className="time-status">
          <FontAwesomeIcon icon={faClock} className="clock-icon" />{timePassed} - {capitalizeFirstLetter(status)}
        </div>
        <div className="people-count"><FontAwesomeIcon icon={faUser} />{peopleCount}</div>
      </div>
    </div>
  );
}

export default OrderTable;
