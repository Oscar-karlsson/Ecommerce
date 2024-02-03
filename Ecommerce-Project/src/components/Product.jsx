import React, { useContext, useState } from 'react';
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext";




const Product = ({ product }) => {
  const imageUrl = product.images.length > 0 ? product.images[0] : '/path-to-default-image.jpg';
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
const [isAdded, setIsAdded] = useState(false);
  

    const handleProductClick = () => {
      // Navigate to product detail page
      navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevents the click from triggering the navigation
      addToCart(product); // Add the product to the cart
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleProductClick();
      }
    };

    return (
      <div className={styles.carouselContainer}>
    <div
      className={styles.productCard}
      onClick={handleProductClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <img src={imageUrl} alt={product.name} />
      <div className={styles.titleAndDescriptionContainer}>
        <h3>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
      <div className={styles.priceAndButtonContainer}>
        <p className={styles.productPrice}>{product.price} kr</p>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  </div>
    );
};


export default Product;