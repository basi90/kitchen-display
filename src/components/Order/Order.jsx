import React from 'react';
import './Order.css';

function Order({ product, quantity }) {
  return (
    <div className="order">
      <span className="quantity">{quantity}x</span>
      <span className="product">{product}</span>
    </div>
  );
}

export default Order;
