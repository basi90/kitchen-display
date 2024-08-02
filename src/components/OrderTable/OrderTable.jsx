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
  // State for the status of the table
  const [status, setStatus] = useState(initialStatus);

  // State for the number of people at the table
  const [peopleCount, setPeopleCount] = useState(initialPeopleCount);

  // State for the name of the server at the table
  const [waiter, setWaiterName] = useState(serverName);

  // Reference for the orders container (used for scrolling features)
  const ordersRef = useRef(null);

  // State to control the visibility of the "More Items" indicator
  const [showMoreIndicator, setShowMoreIndicator] = useState(false);

  // Effect to handle randomizing the waiter name and people count on mount
  useEffect(() => {
    const randomPeopleCount = () => Math.floor(Math.random() * 8) + 1;
    setPeopleCount(randomPeopleCount());
    const randomName = names[Math.floor(Math.random() * names.length)];
    setWaiterName(randomName);
  }, []);

  // Effect to add a scroll listener to the orders container
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

  // Function to handle click events on the table, changing its status or highlighting it
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
