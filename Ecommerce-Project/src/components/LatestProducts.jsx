import React from 'react';
import styles from './Product.module.css'; 
import productListStyles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LatestProducts = ({ products }) => {
    // Get the 5 latest products
    const latestProducts = products.slice(0, 5);
    const navigate = useNavigate();
  
    return (
      <div>
        <h2 className={productListStyles.categoryTitle}>Nyheter</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {latestProducts.map((product) => {
            const imageUrl = product.images.length > 0 ? product.images[0] : '/path-to-default-image.jpg';
  
            const handleProductClick = () => {
              // Navigate to product detail page
              navigate(`/product/${product._id}`);
            };
  
            const handleAddToCart = (e) => {
              e.stopPropagation(); // Prevents the click from triggering the navigation
              // Add to cart logic here
            };
  
            return (
              <div key={product._id} className={styles.productCard} onClick={handleProductClick}>
                <img src={imageUrl} alt={product.name} />
                <div className={styles.titleAndDescriptionContainer}>
                  <h3>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                </div>
                <div className={styles.priceAndButtonContainer}>
                  <p className={styles.productPrice}>${product.price}</p>
                  <button className={styles.addToCartButton} onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


export default LatestProducts;