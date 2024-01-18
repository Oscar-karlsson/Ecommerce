import React from "react";
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




const Product = ({ product }) => {
  const imageUrl = product.images.length > 0 ? product.images[0] : '/path-to-default-image.jpg';
  const navigate = useNavigate();
  

    const handleProductClick = () => {
      // Navigate to product detail page
      navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevents the click from triggering the navigation
      // Add to cart logic here
    };

    return (
        <div className={styles.productCard} onClick={handleProductClick}>
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
};


export default Product;