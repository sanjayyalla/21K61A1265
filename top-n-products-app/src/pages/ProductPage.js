import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  // Fetch and display product details using the id
  return (
    <div className="container mt-4">
      <h2>Product Details for ID: {id}</h2>
      {/* Product details to be displayed here */}
    </div>
  );
};

export default ProductPage;
