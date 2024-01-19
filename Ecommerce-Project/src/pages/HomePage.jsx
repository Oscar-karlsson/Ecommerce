import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import LatestProducts from '../components/LatestProducts';


const API_URL = 'https://js2-ecommerce-api.vercel.app/api/products';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductList products={products} />
      <LatestProducts products={products} /> 
    </div>
  );
};


export default HomePage;