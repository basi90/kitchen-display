// src/components/Order.js
import React from 'react';

function Order({ product, quantity }) {
  return (
    <div className="order">
      <span>{product}: {quantity}</span>
    </div>
  );
}

export default Order;
