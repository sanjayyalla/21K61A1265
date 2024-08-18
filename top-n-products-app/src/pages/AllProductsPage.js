import React, { useState, useEffect } from 'react';
import { getTopProducts } from '../services/api';
import ProductItem from '../components/ProductItem';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzg5OTUxLCJpYXQiOjE3MjM3ODk2NTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA5Y2YzOGVhLTM4OTktNGE2My1hMGU5LWZmOTY3ZTA1ZTgwMSIsInN1YiI6InNhbmpheS55YWxsYUBzYXNpLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiU2FzaSBJbnN0aXR1dGUgT2YgVGVjaG5vbG9neSBcdTAwMjYgRW5naW5lZXJpbmciLCJjbGllbnRJRCI6IjA5Y2YzOGVhLTM4OTktNGE2My1hMGU5LWZmOTY3ZTA1ZTgwMSIsImNsaWVudFNlY3JldCI6IkZPT2ZQTElFSlRhbXRNa2UiLCJvd25lck5hbWUiOiJTYW5qYXkgWWFsbGEiLCJvd25lckVtYWlsIjoic2FuamF5LnlhbGxhQHNhc2kuYWMuaW4iLCJyb2xsTm8iOiIyMUs2MUExMjY1In0.0tpQu8hJKBMrk-Z3S9OWGCJxbbD4vKS-IQOK6LB7xy8'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getTopProducts('AMZ', 'Laptop', 10, 1000, 10000, authToken);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Top Products</h2>
      <div className="row">
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
