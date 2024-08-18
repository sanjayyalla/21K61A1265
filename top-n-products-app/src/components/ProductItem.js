import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src="https://via.placeholder.com/150" className="card-img-top" alt={product.productName} />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">Price: ₹{product.price}</p>
          <p className="card-text">Rating: {product.rating}</p>
          <p className="card-text">Discount: {product.discount}%</p>
          <p className="card-text">Availability: {product.availability}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
