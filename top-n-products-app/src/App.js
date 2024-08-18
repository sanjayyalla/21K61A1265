import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductPage from './pages/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
