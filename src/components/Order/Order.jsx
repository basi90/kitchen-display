import React from 'react';
import './Order.css';

function formatProductName(productName) {
  if (!productName) return '';
  return productName.replace(/_/g, ' ');
}


function Order({ product, quantity }) {
  return (
    <div className="order">
      <span className="quantity">{quantity}x</span>
      <span className="product">{formatProductName(product)}</span>
    </div>
  );
}

export default Order;
