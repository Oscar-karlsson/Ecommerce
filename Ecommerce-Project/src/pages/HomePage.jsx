import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import LatestProducts from '../components/LatestProducts';
import HeaderSlider from '../components/HeaderSlider';
import Loading from '../components/Loading';


const API_URL = 'https://js2-ecommerce-api.vercel.app/api/products';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setIsLoading(false); // Set isLoading to false after the products have been fetched
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false); // Also set isLoading to false if there was an error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);




  if (isLoading) {
    return <Loading />;
  }
  
 

  return (
      <div>
      <HeaderSlider />
      <ProductList products={products} />
      <LatestProducts products={products} /> 
    </div>
  );
};


export default HomePage;