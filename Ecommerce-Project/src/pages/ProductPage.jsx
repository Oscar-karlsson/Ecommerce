import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';
import productStyles from '../components/Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const API_ENDPOINT = 'https://js2-ecommerce-api.vercel.app/api/products'; 

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setCategories([...new Set(data.map(product => product.category))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);




  

  

  const handleProductClick = (productId) => {
    // Navigate to the product details page
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click from triggering the navigation
    // Add to cart logic here
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Filter products by category when selectedCategory changes
  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1>{selectedCategory ? capitalizeFirstLetter(selectedCategory) : 'Alla Kategorier'}</h1>

      <select className={styles.dropdown} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">Alla Kategorier</option>
        {categories.map(category => (
          <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
        ))}
      </select>
            
      <div className={styles.productsGrid}>
        {filteredProducts.map(product => (
          <div key={product._id} className={productStyles.productCard} onClick={() => handleProductClick(product._id)}>
            <img src={product.images[0]} alt={product.name} />
            <div className={productStyles.titleAndDescriptionContainer}>
              <h3>{product.name}</h3>
              <p className={productStyles.productDescription}>{product.description}</p>
            </div>
            <div className={productStyles.priceAndButtonContainer}>
              <p className={productStyles.productPrice}>{product.price} kr</p>
              <button className={productStyles.addToCartButton} onClick={(e) => { e.stopPropagation(); /* handleAddToCart function here */ }}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;