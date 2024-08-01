import React from 'react';
import './Order.css';

function Order({ product, quantity }) {
  return (
    <div className="order">
      <span>{quantity}x {product}</span>
    </div>
  );
}

export default Order;
