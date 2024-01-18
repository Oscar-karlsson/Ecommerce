import React from "react";
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';




const Product = ({ product }) => {
    // Use the first image in the images array, or a default image if the array is empty
    const imageUrl = product.images.length > 0 ? product.images[0] : '/path-to-default-image.jpg';
  

    return (
        <div className={styles.productCard}>
          <img src={imageUrl} alt={product.name} />
          <div className={styles.titleAndDescriptionContainer}>
            <h3>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
          <div className={styles.priceAndButtonContainer}>
            <p className={styles.productPrice}>${product.price}</p>
            <button className={styles.addToCartButton}>
              <FontAwesomeIcon icon={faShoppingCart} /> 
            </button>
          </div>
        </div>
      );
    };

export default Product;