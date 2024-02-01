
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';




const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const { id } = useParams();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const modalRef = useRef();
    const { addToCart } = useContext(CartContext);
    const [mainImage, setMainImage] = useState('');
    

    useEffect(() => {
      if (product && product.images.length > 0) {
        setMainImage(product.images[0]);
      }
    }, [product]);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    
  
    useEffect(() => {
      axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${id}`) // Using the ID to fetch data
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          // You may want to handle 404 Not Found and 400 Bad Request errors here
        });
    }, [id]);



    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
      };

      const handleIncrement = () => {
        setQuantity(quantity + 1);
      };

      const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };
    
    
      const handleProductClick = () => {
        // Navigate to product detail page
        navigate(`/product/${product._id}`);
      };
  
      const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevents the click from triggering the navigation
        const productToAdd = {
            ...product,
            quantity: parseInt(quantity) // Ensure quantity is included and correctly formatted
        };
        addToCart(productToAdd); // Add the product to the cart
        setQuantity(1);
    };
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className={styles.productDetails}>
        <div className={styles.imageContainer}>
          <div className={styles.mainImageContainer}>
            <img src={mainImage} alt={product.name} className={styles.mainImage} />
          </div>
          <div className={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index}`} className={styles.thumbnailImage} onClick={() => setMainImage(image)} />
            ))}
          </div>
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>
  {isDescriptionExpanded ? product.description : `${product.description.substring(0, 500)}...`}
</p>
<button className={styles.readMoreBtn} onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
  {isDescriptionExpanded ? 'Read Less' : 'Read More'}
</button>
          <div className={styles.actionRow}>
            <p className={styles.productPrice}>{product.price} kr</p>
            <div className={styles.quantityAndButton}>
              <button className={styles.decrement} onClick={handleDecrement}>-</button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
                className={styles.quantityInput} 
              />
              <button className={styles.increment} onClick={handleIncrement}>+</button>
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default ProductDetail;